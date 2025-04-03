const { console } = require("inspector");
const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUND_NAME,
  api_key: process.env.CLOUDINARY_AIP_KEY,
  api_secret: process.env.CLOUDINARY_AIP_SECRET,
});

exports.saveProduct = async (req, res) => {
  try {
    const { qrCode, name, description, supplierId, images } = req.body;

    const product = await prisma.product.create({
      data: {
        qrCode: qrCode,
        name: name,
        description: description,
        supplierId: parseInt(supplierId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error saveProduct in controller!!!" });
  }
};
exports.listsProduct = async (req, res) => {
  try {
    const { count } = req.params;
    const products = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: { createdAt: "desc" },
      include: {
        supplier: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error listsProduct in controller!!!" });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { qrCode, name, description, supplierId, images } = req.body;
    // code

    await prisma.image.deleteMany({
      where: {
        productId: Number(req.params.id),
      },
    });
    await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        qrCode: qrCode,
        name: name,
        description: description,
        supplierId: parseInt(supplierId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });
    res.send("Update Success");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error updateProduct in controller!!!" });
  }
};
exports.removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //ລົບຮູບໃນ Cloudinary
    //ຄົ້ນຫາສິນຄ້າ Include image
    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      return res.status(400).json({ message: "ບໍ່ມີສິນຄ້າ" });
    }

    // ລົບຮູບໃນ Cloudinary
    const deleteimage = product.images.map(
      async (image) =>
        new Promise((resolve, reject) => {
          // ລົບຮູບໃນ Cloudinary
          cloudinary.uploader.destroy(image.public_id, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        })
    );
    await Promise.all(deleteimage);

    const products = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    res.send(products);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error removeProduct in controller!!!" });
  }
};
exports.readProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        supplier: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error readProduct in controller!!!" });
  }
};
exports.listbyProduct = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    console.log(sort, order, limit);
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: {
        supplier: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error listbyProduct in controller!!!" });
  }
};

const handleQuery = async (req, res, query) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      include: {
        supplier: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error Search handleQuery in controller!!!" });
  }
};

const handleSuppiler = async (req, res, supplierId) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        supplierId: {
          in: supplierId.map((id) => Number(id)),
        },
      },
      include: {
        supplier: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error Search handleQuery in controller!!!" });
  }
};
exports.searchfiltersProduct = async (req, res) => {
  try {
    const { query, unit, supplier } = req.body;
    if (query) {
      console.log("query-->", query);
      await handleQuery(req, res, query);
    }
    // if (unit) {
    //   console.log("unit-->", unit);
    // }
    if (supplier) {
      console.log("supplier-->", supplier);
      await handleSuppiler(req, res, supplier);
    }
  } catch (err) {
    console.log(err);
    d;
    res
      .status(500)
      .json({ message: "Server error searchfiltersProduct in controller!!!" });
  }
};

exports.UploadImages = async (req, res) => {
  try {
    console.log(req.body);
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `JIMCOM-${Date.now()}`,
      resource_type: "auto",
      folder: "PRODUCT_WAREHOUSE",
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error UploadImages in controller!!!" });
  }
};
exports.RemoveImage = async (req, res) => {
  try {
    const { public_id } = req.body;
    cloudinary.uploader.destroy(public_id, (result) => {
      res.send("Remove Image Success!!!");
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error RemoveImage in controller!!!" });
  }
};
