// const { console } = require("inspector");
const prisma = require("../config/prisma");
exports.saveInputProduct = async (req, res) => {
  try {
    const {
      productId,
      warehouseId,
      quantityPo,
      Quantity_Inp,
      Warning,
      categoryIdCt,
      minimumStock,
      unitIdUt,
    } = req.body;

    // ✅ 1. ເພິ່ມ InputProduct ເຂົ້າ Database
    const newInput = await prisma.inputProduct.create({
      data: {
        productId: parseInt(productId),
        warehouseId: warehouseId, 
        quantityPo: parseInt(quantityPo),
        Quantity_Inp: parseInt(Quantity_Inp),
        minimumStock: minimumStock,
        categoryIdCt: parseInt(categoryIdCt),
        unitIdUt: parseInt(unitIdUt),
        Warning: Warning,
      },
    });

    // ✅ 2. ຄົ້ນຫາວ່າໃນ WarehouseStock ມີສິນຄ້າໃນຄັງແລ້ວບໍ່
    const existingStock = await prisma.warehouseStock.findFirst({
      where: {
        productId: parseInt(productId),
        warehouseId: parseInt(warehouseId), 
      },
    });

    if (existingStock) {
      // ✅ 3. ຖ້າມີສິນຄ້າໃນ WarehouseStock ຢູ່ → ໃຫ້ບວກຈຳນວນຊອງQuantity_Inp ໃສ່ totalQuantity
      await prisma.warehouseStock.update({
        where: { id: existingStock.id },
        data: {
          totalQuantity: existingStock.totalQuantity + Quantity_Inp, // เพิ่มจำนวนเข้าไป
        },
      });
    } else {
      // ✅ 4. ຖ້າຍັງບໍ່ມີສິນຄ້າໃນ WarehouseStock ເພິ່ມສິນຄ້າເຂົ້າຄັງໃຫມ່
      await prisma.warehouseStock.create({
        data: {
          productId: parseInt(productId),
          warehouseId: parseInt(warehouseId), // เพิ่ม warehouseId ให้เชื่อมโยงกับคลัง
          totalQuantity: Quantity_Inp, // จำนวนที่นำเข้า
          minimumStock: parseInt(minimumStock),
          categoryIdCt: parseInt(categoryIdCt),
          unitIdUt: parseInt(unitIdUt),
        },
      });
    }

    res.json({
      message: "Input Product added and WarehouseStock updated",
      newInput,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding Input Product" });
  }
};

exports.listInputProduct = async (req, res) => {
  try {
    const inputproducts = await prisma.inputProduct.findMany();
    res.send(inputproducts);
  } catch (err) {
    s;
    console.log(err);
    res
      .status(500)
      .json({ message: "server error listInputProduct in controller!!!" });
  }
};

exports.updateInputProduct = async (req, res) => {
  try {
    // code
    const { name, location, contact, email } = req.body;

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
    res.send(warehouse);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error UpdateInputProduct in controller!!!" });
  }
};

exports.readInputProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const warehouse = await prisma.warehouse.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.send(warehouse);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error reradInputProduct in controller!!!" });
  }
};

exports.removeInputProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const inputproducts = await prisma.inputProduct.delete({
      where: {
        idInp: Number(id),
      },
    });
    res.send(inputproducts);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error removeInputProduct in controller!!!" });
  }
};
