import axios from "axios"

export const SaveProduct = async(token,form)=>{
    return await axios.post("http://localhost:5003/api/product",form,{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}
export const listProduct = async(token,count = 20)=>{
    return await axios.get("http://localhost:5003/api/products/"+count,{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}


//aip images
export const UploadImages = async(token,form)=>{
    
    return await axios.post("http://localhost:5003/api/images",{
        image:form
    },{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}


export const RemoveImage = async(token,public_id)=>{
    return await axios.post("http://localhost:5003/api/removeimage",{
        public_id
    },{
        
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}