const prisma = require("../config/prisma");
const bcryptjs = require("bcryptjs");
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

    const user = await prisma.user.findFirst({
      where: {
        username: username
      }
    })
    console.log(user);

    // console.log(username, password);
    res.send("hi register in controller!!!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error register in controller!!!" });
  }
};

exports.login = async (req, res) => {
  //code
  try {
    res.send("hi login in controller!!!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error login in controller!!!" });
  }
};

exports.currentUser = async (req, res) => {
  //code
  try {
    res.send("hi currentUser in controller!!!");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error currentUser in controller!!!" });
  }
};
