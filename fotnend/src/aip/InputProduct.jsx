import axios from "axios";




export const SaveIputProduct = async(token,form)=>{
    return await axios.post("http://localhost:5003/api/inputproduct",form,{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}
export const listIputProduct = async(token)=>{
    return await axios.get("http://localhost:5003/api/inputproduct",{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}

export const removeIputProduct = async(token,id)=>{
    return await axios.delete('http://localhost:5003/api/inputproduct/'+id,{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}