const { console } = require("inspector");
const prisma = require("../config/prisma");

exports.saveSupplier = async (req, res) => {
  try {
    const { name, contactName, email, phone, address } = req.body;
    const existingSupplier = await prisma.supplier.findFirst({
      where: {
        OR: [{ name: name }, { phone: phone }, { email: email }],
      },
    });

    if (existingSupplier) {
      let errorMessage = "ຂໍ້ມູນຊ້ຳ: ";
      if (existingSupplier.name === name) errorMessage += "ຊື່ບໍລິສັດ, ";
      if (existingSupplier.phone === phone) errorMessage += "ເບີໂທ, ";
      if (existingSupplier.email === email) errorMessage += "ອີເມວ, ";

      return res
        .status(400)
        .json({ message: errorMessage + "ມີຢູ່ໃນລະບົບແລ້ວ!!!" });
    }

    const supplier = await prisma.supplier.create({
      data: {
        name: name,
        contactName: contactName,
        email: email,
        phone: phone,
        address: address,
      },
    });
    res.send(supplier);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error saveUnit in controller!!!" });
  }
};

exports.listSupplier = async (req, res) => {
  try {
    const supplier = await prisma.supplier.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.send(supplier);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUnit in controller!!!" });
  }
};
exports.updateSupplier = async (req, res) => {
  try {
    // code
    const { name, contactName, email, phone, address } = req.body;

    const supplier = await prisma.supplier.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: name,
        contactName: contactName,
        email: email,
        phone: phone,
        address: address,
      },
    });
    res.send(supplier);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUnit in controller!!!" });
  }
};

exports.readSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const suppliers = await prisma.supplier.findFirst({
      where: {
        id: Number(id),
      },
    });
    res.send(suppliers);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error readEmployee in controller!!!" });
  }
};

exports.removeSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await prisma.supplier.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(supplier);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error removeUnit in controller!!!" });
  }
};
