// const { console } = require("inspector");
const prisma = require("../config/prisma");

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
            idasset: item.idasset,
            idpublic: item.idpublic,
            url: item.url,
            SecureUrl: item.SecureUrl,
          })),
        },
      },
    });
    res.send("Save Product Success");
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

    //ລົບຮູບເກົາອອກກ່ອນອັບໃຫມ່
    const { id } = req.params;
    await prisma.image.deleteMany({
      where: {
        productId: Number(id),
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
            idasset: item.idasset,
            idpublic: item.idpublic,
            url: item.url,
            SecureUrl: item.SecureUrl,
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
    res
      .status(500)
      .json({ message: "Server error searchfiltersProduct in controller!!!" });
  }
};
