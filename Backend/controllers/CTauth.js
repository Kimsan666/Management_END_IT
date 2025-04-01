const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  //code
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).json({ message: "email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }
    //Check Username in DB ກວດສອບ username ໃນຖານຂໍ້ມູນ
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (user) {
      return res.status(400).json({ message: "username already exist" });
    }

    //Hash Password
    const hasPassword = await bcrypt.hash(password, 10);

    //Step 4 Register ບັນທຶກ

    await prisma.user.create({
      data: {
        username: username,
        password: hasPassword,
      },
    });
    console.log(hasPassword);

    // console.log(username, password);
    res.send("Register Success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error register in controller!!!" });
  }
};

exports.login = async (req, res) => {
  //code
  try {
    const { username, password } = req.body;

    //Check Username in DB ກວດສອບ ຜູ້ໃຊ້ໃນ ຖານຂໍ້ມູນ
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user || !user.enabled) {
      return res
        .status(400)
        .json({ message: "username not found or now enabled" });
    }
    // check password ກວດສອບລະຫັດໃນຖານຂໍ້ມູນ, bcrypt ແມ່ນການເຂົ້າລະຫັດໃຊ້ bcrypt.hash ແລະ ຖອດລະຫັດໃຊ້ bcrypt.compare

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "password Invalid!!!" });
    }

    //Create Payload ຄືວັດຖຸຊື່ໆ
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role
    };


    //Generrate Token ສ້າງ Token ເອົາໄວ້ກວດສອບ SECRET ແມ່ນ ສ້າງໃນ env ແລະ expiresIn ແມ່ນກຳໜົດມື້ໝົດອາຍຸຂອງ Token
    jwt.sign(
      payload, process.env.SECRET, {
        expiresIn: '1d',
      },(err,token)=>{
        if(err){
          return res.status(500).json({ message: "server error login in controller!!!" });
        }
        res.json({payload,token})
      }
    )

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error login in controller!!!" });
  }
};

exports.currentUser = async (req, res) => {
  //code
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: req.user.username,
      },
      select: {
        id: true,
        username: true,
        role: true,
        employee: {
          select: {
            id: true,
            firstName: true,
            email: true,
            position: true,
          },
        }

      }
    });
    res.json({user});
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error currentUser in controller!!!" });
  }
};
