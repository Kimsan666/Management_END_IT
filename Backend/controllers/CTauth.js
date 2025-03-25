exports.register = async(req, res) => {
  //code
  try {
    const {email,password} = req.body
    if(!email){
      return res.status(400).json({message:"email is required"})
    }
    if(!password){
      return res.status(400).json({message:"password is required"})
    }
    

    console.log(email,password);
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