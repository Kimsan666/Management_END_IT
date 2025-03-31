const prisma = require("../config/prisma");
exports.listUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        employee: {
          select: {
            firstName: true,
            lastName: true,
            position: true,
            email: true,
            phoneNumbers: {
              select: {
                number: true,
              },
            },
          },
        },
      },
    });
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUser in controller!!!" });
  }
};
exports.ChangeStatus = async (req, res) => {
  try {
    const { id, enabled } = req.body;
    const users = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        enabled: enabled,
      },
    });

    console.log(id, enabled);
    res.send("Update Status Sueccess");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUser in controller!!!" });
  }
};
exports.ChangeRole = async (req, res) => {
  try {
    const { id, role } = req.body;
    const users = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        role: role,
      },
    });

    console.log(id, role);
    res.send("Update Status Sueccess");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUser in controller!!!" });
  }
};
exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body; // คาดว่า req.body.cart ควรจะเป็น Array
    console.log(cart); // ตรวจสอบว่า cart ได้ข้อมูลที่ถูกต้องจาก Postman

    const user = await prisma.user.findFirst({
      where: { id: Number(req.user.id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartMap = new Map(); // 🔥 ใช้ Map เก็บสินค้าแบบรวมจำนวน
    let totalQuantity = 0;

    // ตรวจสอบ cart ว่าเป็น Array หรือไม่
    if (!Array.isArray(cart)) {
      return res.status(400).json({ message: "Cart is not an array" });
    }

    const { nameCtm, nameDriver, carRegis } = req.body; // nameCtm, nameDriver, carRegis ควรอยู่ใน req.body

    for (let item of cart) {
      // ✅ ค้นหา warehouseStock โดยใช้ productId และ warehouseId
      const warehouseStock = await prisma.warehouseStock.findFirst({
        where: {
          productId: item.productId,
          warehouseId: item.warehouseId,
          totalQuantity: { gte: item.quantity }, // ต้องมีสินค้าพอ
        },
      });

      if (!warehouseStock) {
        return res.status(400).json({
          message: `สินค้า ${item.productId} ไม่มีในสต็อกหรือจำนวนไม่พอ`,
        });
      }

      const key = warehouseStock.id; // ใช้ warehouseStockId เป็น Key

      // 🔥 ถ้ามีสินค้าเดิมแล้วให้บวกจำนวนเพิ่ม
      if (cartMap.has(key)) {
        cartMap.set(key, cartMap.get(key) + item.quantity);
      } else {
        cartMap.set(key, item.quantity);
      }

      // เพิ่ม reservedQuantity ใน warehouseStock
      await prisma.warehouseStock.update({
        where: {
          id: warehouseStock.id,
        },
        data: {
          reservedQuantity: warehouseStock.reservedQuantity + item.quantity, // เพิ่ม reservedQuantity ตามจำนวนที่เพิ่มในตะกร้า
        },
      });

      totalQuantity += item.quantity;
    }

    // ✅ แปลง Map ให้เป็น Array ของ cartItems
    let cartItems = Array.from(cartMap, ([warehouseStockId, quantity]) => ({
      warehouseStockId,
      quantity,
    }));

    // 🔥 สร้าง Cart พร้อม CartItem ที่รวมจำนวนสินค้าแล้ว
    const newCart = await prisma.cart.create({
      data: {
        nameCtm: nameCtm,
        carRegis: carRegis,
        nameDriver: nameDriver,
        items: {
          create: cartItems,
        },
        quantityTot: totalQuantity,
        userId: user.id,
      },
    });

    console.log(newCart);
    res.status(200).json(newCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findMany({
      where: {
        userId: Number(req.user.id),
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    // console.log(cart);
    res.json({
      // items: cart[0].items,
      // quantity: cart[0].quantityTot,
      cart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUser in controller!!!" });
  }
};
exports.clearUserCart = async (req, res) => {
  try {
    const { id } = req.params;

    // ตรวจสอบว่า id ที่รับมาเป็นตัวเลขหรือไม่
    if (isNaN(id)) {
      return res.status(400).json({ message: "Cart ID ไม่ถูกต้อง" });
    }

    // ค้นหาตะกร้าที่ผู้ใช้ต้องการลบ
    const cart = await prisma.cart.findFirst({
      where: {
        id: Number(id),
        userId: Number(req.user.id),
      },
      include: {
        items: true, // ดึง CartItems ด้วย เพื่อใช้ในการลด reservedQuantity
      },
    });

    // ถ้าไม่พบตะกร้า หรือไม่ใช่ตะกร้าของผู้ใช้
    if (!cart) {
      return res.status(400).json({
        message: "ไม่พบตะกร้านี้ หรือไม่ใช่ตะกร้าของผู้ใช้ที่ล็อกอิน",
      });
    }

    // เริ่มต้นลบสินค้าจาก CartItem และอัพเดต reservedQuantity
    const cartItems = cart.items;
    for (let cartItem of cartItems) {
      const warehouseStock = await prisma.warehouseStock.findUnique({
        where: { id: cartItem.warehouseStockId },
      });

      if (warehouseStock) {
        // ลด reservedQuantity ใน WarehouseStock
        await prisma.warehouseStock.update({
          where: { id: warehouseStock.id },
          data: {
            reservedQuantity:
              warehouseStock.reservedQuantity - cartItem.quantity, // ลดจำนวน reservedQuantity
          },
        });
      }
    }

    // ลบตะกร้าที่เลือก
    const removecart = await prisma.cart.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "ลบตะกร้าเรียบร้อย",
      deletedCart: removecart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
};

exports.saveNameCum = async (req, res) => {
  try {
    res.send("hi saveNameCum");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUser in controller!!!" });
  }
};
exports.saveOrder = async (req, res) => {
  try {
    // ดึง cartId จาก URL params
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "กรุณาระบุ cartId ใน URL" });
    }

    // ค้นหาข้อมูลจาก Cart ที่ระบุ
    const cart = await prisma.cart.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        items: true,
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart ไม่พบ" });
    }

    // ค้นหาผู้ใช้
    const user = await prisma.user.findFirst({
      where: { id: Number(req.user.id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User ไม่พบ" });
    }

    // สร้าง Order ใหม่
    const newOrder = await prisma.order.create({
      data: {
        nameCtm: cart.nameCtm,
        carRegis: cart.carRegis,
        nameDriver: cart.nameDriver,
        userId: user.id,
        quantityTot: cart.quantityTot,
      },
    });

    // สร้าง OrderItems และอัปเดต reservedQuantity และ totalQuantity ของ WarehouseStock
    for (let item of cart.items) {
      await prisma.orderItem.create({
        data: {
          orderId: newOrder.id,
          warehouseStockId: item.warehouseStockId,
          quantity: item.quantity,
        },
      });

      // อัปเดต warehouseStock
      await prisma.warehouseStock.update({
        where: { id: item.warehouseStockId },
        data: {
          reservedQuantity: {
            decrement: item.quantity, // ลด reservedQuantity
          },
          totalQuantity: {
            decrement: item.quantity, // ลด totalQuantity
          },
        },
      });
    }

    // ลบข้อมูลใน Cart และ CartItem
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    await prisma.cart.delete({ where: { id: cart.id } });

    res.status(200).json({ message: "Order ได้รับการบันทึกสำเร็จ และอัปเดตสต็อกเรียบร้อยแล้ว" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
};



exports.getOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: Number(req.user.id) },
      include: {
        items: {
          include: {
            product: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
    if (orders.length === 0) {
      return res.status(400).json({ ok: false, message: "No orders" });
    }
    res.json({ ok: true, orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUser in controller!!!" });
  }
};
