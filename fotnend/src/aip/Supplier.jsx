import axios from "axios";

export const SaveSupplier = async(token,form)=>{
    return await axios.post("http://localhost:5003/api/supplier",form,{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}
export const listSupplier  = async(token)=>{
    return await axios.get("http://localhost:5003/api/suppliers",{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}

export const removeSupplier = async(token,id)=>{
    return await axios.delete('http://localhost:5003/api/supplier/'+id,{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}