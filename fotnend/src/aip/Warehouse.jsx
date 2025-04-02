import axios from "axios";




export const SaveWarehouse = async(token,form)=>{
    return await axios.post("http://localhost:5003/api/warehouse",form,{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}
export const listWarehouse = async(token)=>{
    return await axios.get("http://localhost:5003/api/warehouses",{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}

export const removeWarehouse= async(token,id)=>{
    return await axios.delete('http://localhost:5003/api/warehouse/'+id,{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}