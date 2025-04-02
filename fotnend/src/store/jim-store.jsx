import axios from 'axios';
import {create} from 'zustand';
import {persist,createJSONStorage} from 'zustand/middleware'
import { listCategory } from '../aip/Category';
import { listProduct } from '../aip/Product';
import { listSupplier } from '../aip/Supplier';
import { listUnit } from '../aip/Unit';
import { listWarehouse } from '../aip/Warehouse';



const jimstore = (set)=>({
    user:null,
    token:null,
    categories:[],
    units:[],
    products:[],
    suppliers:[],
    warehouses:[],
    actionLogin:async(form)=>{
        const res =  await axios.post('http://localhost:5003/api/login',form)
        set({
            user:res.data.payload,
            token:res.data.token
        })
        return res
    },

     getCategory : async (token) => {
        try {
          const res = await listCategory(token);
          set({
            categories: res.data,
          });
        } catch (err) {
          console.log(err);
        }
      },
     getUnit : async (token) => {
        try {
          const res = await listUnit(token);
          set({
            units: res.data,
          });
        } catch (err) {
          console.log(err);
        }
      },
     getProduct : async (token,count) => {
        try {
          const res = await listProduct(token,count);
          set({
            products: res.data,
          });
        } catch (err) {
          console.log(err);
        }
      },
     getSupplier : async (token) => {
        try {
          const res = await listSupplier(token);
          set({
            suppliers: res.data,
          });
        } catch (err) {
          console.log(err);
        }
      },
     getWarehouse : async (token) => {
        try {
          const res = await listWarehouse(token);
          set({
            warehouses: res.data,
          });
        } catch (err) {
          console.log(err);
        }
      }
})


const usePersist = {
    name: 'jim-store',
    storage: createJSONStorage(() => localStorage),
    
}

const useJimStore = create(persist(jimstore,usePersist))


export default useJimStore