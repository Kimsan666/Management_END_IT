const { console } = require("inspector");
const prisma = require("../config/prisma");
// exports.saveWarehouseStock = async (req, res) => {
//   try {
//     const { warehouseId,productId,categoryId,totalQuantity,reservedQuantity,Unit } = req.body;
//     const warehousestocks = await prisma.warehouseStock.create({
//       data: {
//         warehouseId: warehouseId,
//         productId: productId,
//         categoryId: categoryId,
//         totalQuantity: totalQuantity,
//         reservedQuantity: reservedQuantity,
//         Unit: Unit,
//       },
//     });
//     res.send(warehousestocks);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "server error WarehouseStock in controller!!!" });
//   }
// };

exports.listWarehouseStock = async (req, res) => {
  try {
    

    const warehousestocks = await prisma.warehouseStock.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            warehouse: true,
            products: true,
            category: true,
            Unit: true
        }
    }
    );
    res.send(warehousestocks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listWarehouseStock in controller!!!" });
  }
};

// exports.updateWarehouseStock = async (req, res) => {
//   try {
//     // code
//     const { name,location,contact,email } = req.body;

//     const warehouse = await prisma.warehouse.update({
//       where: {
//         id: Number(req.params.id),
//       },
//       data: {
//         name: name,
//         location: location,
//         contact: contact,
//         email: email,

//       },
//     });
//     res.send(warehouse)
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "server error listWarehouseStock in controller!!!" });
//   }
// };

// exports.readWarehouseStock = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const warehousestocks = await prisma.warehouseStock.findUnique({
//       where: {
//         id: Number(id),
//       },
//     });
//     res.send(warehousestocks);
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .json({ message: "server error readWarehouseStock in controller!!!" });
//   }
// };

exports.removeWarehouseStock = async (req, res) => {
  try {
    const { id } = req.params;
    const warehousestocks = await prisma.warehouseStock.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(warehousestocks);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error removeWarehouseStock in controller!!!" });
  }
};
