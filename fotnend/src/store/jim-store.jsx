import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../aip/Category";
import { listProduct,SeachProducts } from "../aip/Product";
import { listSupplier } from "../aip/Supplier";
import { listUnit } from "../aip/Unit";
import { listWarehouse } from "../aip/Warehouse";
import { listWarehouseStock } from "../aip/WarehouseStock";

const jimstore = (set) => ({
  user: null,
  token: null,
  categories: [],
  units: [],
  products: [],
  suppliers: [],
  warehouses: [],
  WarehouseStocks: [],
  actionLogin: async (form) => {
    const res = await axios.post("http://localhost:5003/api/login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },

  getCategory: async () => {
    try {
      const res = await listCategory();
      set({
        categories: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getUnit: async () => {
    try {
      const res = await listUnit();
      set({
        units: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({
        products: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  actionSeachProduct: async (arg) => {
    try {
      const res = await SeachProducts(arg);
      set({
        products: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getSupplier: async () => {
    try {
      const res = await listSupplier();
      set({
        suppliers: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getWarehouse: async () => {
    try {
      const res = await listWarehouse();
      set({
        warehouses: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getWarehouseStocks: async () => {
    try {
      const res = await listWarehouseStock();
      set({
        WarehouseStocks: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
});

const usePersist = {
  name: "jim-store",
  storage: createJSONStorage(() => localStorage),
};

const useJimStore = create(persist(jimstore, usePersist));

export default useJimStore;
