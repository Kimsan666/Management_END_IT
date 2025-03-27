exports.saveProduct = async (req, res) => {
    try{
        
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Server error saveProduct in controller!!!"})
    }
};