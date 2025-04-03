import axios from "axios";




export const SaveUnit = async(token,form)=>{
    return await axios.post("http://localhost:5003/api/unit",form,{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}
export const listUnit = async()=>{
    return await axios.get("http://localhost:5003/api/unit",{
        
    })
}

export const removeUnit = async(token,idUt)=>{
    return await axios.delete('http://localhost:5003/api/unit/'+idUt,{
        headers:{
            Authorization:`bearer ${token}`,
        }
    })
}