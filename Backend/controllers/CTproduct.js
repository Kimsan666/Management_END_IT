const { console } = require("inspector");
const prisma = require("../config/prisma");

exports.saveProduct = async (req, res) => {
  try {
    const {
      qrCode,
      name,
      description,
      supplierId,
      images,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        qrCode: qrCode,
        name: name,
        description: description,
        supplierId: parseInt(supplierId),
        images: [],
      },
    });
    res.send(product);

    res.send("hi saveProduct");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error saveProduct in controller!!!" });
  }
};
exports.listsProduct = async (req, res) => {
  try {
    res.send("hi listsProduct");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error listsProduct in controller!!!" });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    res.send("hi updateProduct");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error updateProduct in controller!!!" });
  }
};
exports.removeProduct = async (req, res) => {
  try {
    res.send("hi removeProduct");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error removeProduct in controller!!!" });
  }
};
exports.readProduct = async (req, res) => {
  try {
    res.send("hi readProduct");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error readProduct in controller!!!" });
  }
};

exports.searchfiltersProduct = async (req, res) => {
  try {
    res.send("hi searchfiltersProduct");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error searchfiltersProduct in controller!!!" });
  }
};
