exports.register = async(req, res) => {
  //code
  try {
    res.send("hi register in controller!!!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error register in controller!!!" });
  }
};

exports.login = async(req, res) => {
  //code
  try {
    res.send("hi login in controller!!!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error login in controller!!!" });
  }
};

exports.currentUser = async(req, res) => {
    //code
    try {
      res.send("hi currentUser in controller!!!");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "server error currentUser in controller!!!" });
    }
  };