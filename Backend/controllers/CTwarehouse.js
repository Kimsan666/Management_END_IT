const { console } = require("inspector");
const prisma = require("../config/prisma");
exports.saveWarehouse = async (req, res) => {
  try {
    const { name,location,contact,email } = req.body;
    const warehouse = await prisma.warehouse.create({
      data: {
        name: name,
        location: location,
        contact: contact,
        email: email,
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
    const warehouse = await prisma.warehouse.findMany();
    res.send(warehouse);
  } catch (err) {s
    console.log(err);
    res.status(500).json({ message: "server error listUnit in controller!!!" });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    // code
    const { name,location,contact,email } = req.body;

    const warehouse = await prisma.warehouse.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: name,
        location: location,
        contact: contact,
        email: email,

      },
    });
    res.send(warehouse)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUnit in controller!!!" });
  }
};

exports.removeWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const warehouse = await prisma.warehouse.delete({
      where: {
        id: Number(id),
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
