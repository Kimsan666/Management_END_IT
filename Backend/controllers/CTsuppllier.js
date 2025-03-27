const { console } = require("inspector");
const prisma = require("../config/prisma");

exports.saveSupplier = async (req, res) => {
    try {
      const { name,contactName,email,phone,address } = req.body;
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
      const supplier = await prisma.supplier.findMany();
      res.send(supplier);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error listUnit in controller!!!" });
    }
  };
  exports.updateSupplier = async (req, res) => {
    try {
      res.send("hi updateSupplier");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error listUnit in controller!!!" });
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
  