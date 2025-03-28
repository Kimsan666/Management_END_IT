const { console } = require("inspector");
const prisma = require("../config/prisma");

exports.saveCategory = async (req, res) => {
  //code
  try {
    const { name } = req.body;
    const category = await prisma.category.create({ 
      data: {
        nameCt: name 
      } 
    });

    res.send(category);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error saveCategory in controller!!!" });
  }
};

exports.listCategory = async (req, res) => {
  //code
  try {
    const category = await prisma.category.findMany();
    res.send(category);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error listCategory in controller!!!" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    // code
    const { name } = req.body;

    const category = await prisma.category.update({
      where: {
        idCt: Number(req.params.id),
      },
      data: {
        nameCt: name,

      },
    });
    res.send(category)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUnit in controller!!!" });
  }
};
exports.readCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findFirst({
      where: {
        idCt: Number(id),
      },

    });
    res.send(category);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error readEmployee in controller!!!" });
  }
};

exports.removeCategory = async (req, res) => {
  //code
  try {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: {
        idCt: Number(id),
      },
    })
    res.send(category);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error removeCategory in controller!!!" });
  }
};
