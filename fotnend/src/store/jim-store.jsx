import axios from 'axios';
import {create} from 'zustand';
import {persist,createJSONStorage} from 'zustand/middleware'



const jimstore = (set)=>({
    user:null,
    token:null,
    actionLogin:async(form)=>{
        const res =  await axios.post('http://localhost:5003/api/login',form)
        set({
            user:res.data.payload,
            token:res.data.token
        })
        return res
    }
})


const usePersist = {
    name: 'jim-store',
    storage: createJSONStorage(() => localStorage),
    
}

const useJimStore = create(persist(jimstore,usePersist))


export default useJimStore