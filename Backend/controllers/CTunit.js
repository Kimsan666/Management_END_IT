const { console } = require("inspector");
const prisma = require("../config/prisma");
exports.saveUnit = async (req, res) => {
  try {
    const { name } = req.body;
    const unit = await prisma.unit.create({
      data: {
        nameUt: name,
      },
    });
    res.send(unit);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error saveUnit in controller!!!" });
  }
};

exports.listUnit = async (req, res) => {
  try {
    const unit = await prisma.unit.findMany();
    res.send(unit);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUnit in controller!!!" });
  }
};

exports.updateUnit = async (req, res) => {
  try {
    // code
    const { name } = req.body;

    const unit = await prisma.unit.update({
      where: {
        idUt: Number(req.params.id),
      },
      data: {
        nameUt: name,

      },
    });
    res.send(unit)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUnit in controller!!!" });
  }
};

exports.removeUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const unit = await prisma.unit.delete({
      where: {
        idUt: Number(id),
      },
    });
    res.send(unit);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error removeUnit in controller!!!" });
  }
};
