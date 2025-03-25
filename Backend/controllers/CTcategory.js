const { console } = require("inspector");

exports.saveCategory = async (req, res) => {
  //code
  try {
    res.send("hi saveCategory in controller!!!");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error saveCategory in controller!!!" });
  }
};

exports.listCategory = async (req, res) => {
  //code
  try {
    res.send("hi listCategory in controller!!!");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error listCategory in controller!!!" });
  }
};

exports.removeCategory = async (req, res) => {
  //code
  try {
    const { id } = req.params;
    console.log(id);
    res.send("hi removeCategory in controller!!!");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "server error removeCategory in controller!!!" });
  }
};
