// const { console } = require("inspector");
const prisma = require("../config/prisma");

exports.saveEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      village,
      city,
      province,
      position,
      dateOfBirth,
      number,
      images,
    } = req.body;
    const birthDate = new Date(dateOfBirth);
    birthDate.setUTCHours(0, 0, 0, 0);
    const employees = await prisma.employee.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        village: village,
        city: city,
        province: province,
        position: position,
        dateOfBirth: birthDate,
        phoneNumbers:{
          create: number.map((item) => ({
            number: item.number
          }))
        },
        images: {
          create: images.map((item) => ({
            idasset: item.idasset,
            idpublic: item.idpublic,
            url: item.url,
            SecureUrl: item.SecureUrl,
          })),
        },
      },
    });
    res.send(employees);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error saveEmployee in controller!!!" });
  }
};
exports.listsEmployee = async (req, res) => {
  try {
    const { count } = req.params;
    const employees = await prisma.employee.findMany({
      take: parseInt(count),
      orderBy: { createdAt: "desc" },
      include: {
        phoneNumbers: true,
        images: true,
      },
    });
    res.send(employees);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error listsEmployee in controller!!!" });
  }
};
exports.updateEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      village,
      city,
      province,
      position,
      dateOfBirth,
      number,
      images,
    } = req.body;
    const birthDate = new Date(dateOfBirth);
    birthDate.setUTCHours(0, 0, 0, 0);
    //ລົບຮູບເກົາອອກກ່ອນອັບໃຫມ່
    const { id } = req.params;
    await prisma.image.deleteMany({
      where: {
        employeeId: Number(id),
      },
    });
    await prisma.phoneNumber.deleteMany({
      where: {
        employeeId: Number(id),
      },
    });
    await prisma.employee.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        village: village,
        city: city,
        province: province,
        position: position,
        dateOfBirth: birthDate,
        phoneNumbers:{
          create: number.map((item) => ({
            number: item.number
          }))
        },
        images: {
          create: images.map((item) => ({
            idasset: item.idasset,
            idpublic: item.idpublic,
            url: item.url,
            SecureUrl: item.SecureUrl,
          })),
        },
      },
    });
    res.send("Update employee Success");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error updateEmployee in controller!!!" });
  }
};
exports.removeEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await prisma.employee.delete({
      where: {
        id: Number(id),
      },
    });

    res.send(employees);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error removeEmployee in controller!!!" });
  }
};
exports.readEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await prisma.employee.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        phoneNumbers: true,
        images: true,
      },
    });
    res.send(employees);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error readEmployee in controller!!!" });
  }
};
// exports.listbyProduct = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;
//     console.log(sort, order, limit);
//     const products = await prisma.product.findMany({
//       take: limit,
//       orderBy: { [sort]: order },
//       include: {
//         supplier: true,
//         images: true,
//       },
//     });
//     res.send(products);
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .json({ message: "Server error listbyProduct in controller!!!" });
//   }
// };

const handleQuery = async (req, res, query) => {
  try {
    const employees = await prisma.employee.findMany({
      where: {
        firstName: {
          contains: query,
        },
        
      },
      include: {
        phoneNumbers: true,
        images: true,
      },
    });
    res.send(employees);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error Search handleQuery Employee in controller!!!" });
  }
};

// const handleSuppiler = async (req, res, supplierId) => {
//   try {
//     const products = await prisma.product.findMany({
//       where: {
//         supplierId: {
//           in: supplierId.map((id) => Number(id)),
//         },
//       },
//       include: {
//         supplier: true,
//         images: true,
//       },
//     });
//     res.send(products);
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .json({ message: "Server error Search handleQuery in controller!!!" });
//   }
// };
exports.searchfiltersEmployee = async (req, res) => {
  try {
    const { query, unit, supplier } = req.body;
    if (query) {
      console.log("query-->", query);
      await handleQuery(req, res, query);
    }
    // if (unit) {
    //   console.log("unit-->", unit);
    // }
    // if (supplier) {
    //   console.log("supplier-->", supplier);
    //   await handleSuppiler(req, res, supplier);
    // }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server error searchfiltersEmployee in controller!!!" });
  }
};
