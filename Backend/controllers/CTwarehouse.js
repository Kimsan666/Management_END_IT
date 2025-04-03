const { console } = require("inspector");
const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUND_NAME,
  api_key: process.env.CLOUDINARY_AIP_KEY,
  api_secret: process.env.CLOUDINARY_AIP_SECRET,
});
exports.saveWarehouse = async (req, res) => {
  try {
    const { name, location, contact, email, images } = req.body;

    const existingWarehouse = await prisma.warehouse.findFirst({
      where: {
        OR: [{ name: name }, { contact: contact }, { email: email }],
      },
    });

    if (existingWarehouse) {
      let errorMessage = "ຂໍ້ມູນຊ້ຳ: ";
      if (existingWarehouse.name === name) errorMessage += "ຊື່ສາງ, ";
      if (existingWarehouse.contact === contact) errorMessage += "ເບີໂທ, ";
      if (existingWarehouse.email === email) errorMessage += "ອີເມວ, ";

      return res
        .status(400)
        .json({ message: errorMessage + "ມີຢູ່ໃນລະບົບແລ້ວ!!!" });
    }

    const warehouse = await prisma.warehouse.create({
      data: {
        name: name,
        location: location,
        contact: contact,
        email: email,
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
    res.send(warehouse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error saveUnit in controller!!!" });
  }
};

exports.listWarehouse = async (req, res) => {
  try {
    const warehouse = await prisma.warehouse.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        images: true,
      },
    });
    res.send(warehouse);
  } catch (err) {
    s;
    console.log(err);
    res.status(500).json({ message: "server error listUnit in controller!!!" });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    // code
    const { name, location, contact, email, images } = req.body;
    await prisma.image.deleteMany({
      where: {
        warehouseId: Number(req.params.id),
      },
    });
    await prisma.warehouse.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: name,
        location: location,
        contact: contact,
        email: email,
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
    res.status(500).json({ message: "server error listUnit in controller!!!" });
  }
};

exports.readWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const warehouse = await prisma.warehouse.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        images: true,
      },
    });
    res.send(warehouse);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error removeUnit in controller!!!" });
  }
};

exports.removeWarehouse = async (req, res) => {
  try {
    const { id } = req.params;

    //ລົບຮູບໃນ Cloudinary
    //ຄົ້ນຫາສິນຄ້າ Include image
    const warehouse = await prisma.warehouse.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        images: true,
      },
    });

    if (!warehouse) {
      return res.status(400).json({ message: "ບໍ່ມີສາງນີ້" });
    }

    // ລົບຮູບໃນ Cloudinary
    const deleteimage = warehouse.images.map(
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

    const warehouses = await prisma.warehouse.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(warehouses);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error removeUnit in controller!!!" });
  }
};

exports.UploadImages = async (req, res) => {
  try {
    console.log(req.body);
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `JIMCOM-${Date.now()}`,
      resource_type: "auto",
      folder: "IMAGE_WAREHOUSE",
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
