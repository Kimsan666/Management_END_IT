const prisma = require("../config/prisma");
exports.changeOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const orders = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status,
      },
    });

    console.log(id, status);
    res.send("Update Status Sueccess");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUser in controller!!!" });
  }
};

exports.listOrderAdmi = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
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
        user: {
          select: {
            username: true,
            role: true,
            employee: {
              select: {
                firstName: true,
                lastName: true,
                position: true,
                email: true,
                phoneNumbers:{
                  select: {
                    number: true
                  }
                }
              },
            }
          },
        },
      },
    });
    res.send(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error listUser in controller!!!" });
  }
};
