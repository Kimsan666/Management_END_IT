import axios from "axios";




export const SaveCategory = async(token,form)=>{
    return await axios.post("http://localhost:5003/api/category",form,{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}
export const listCategory = async()=>{
    return await axios.get("http://localhost:5003/api/categorys",{
        
    })
}

export const removeCategory = async(token,idCt)=>{
    return await axios.delete('http://localhost:5003/api/category/'+idCt,{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}