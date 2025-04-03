import React, { useEffect } from "react";
import ProductCart from "../../../components/ProductCard/ProductCart";
import useJimStore from "../../../store/jim-store";
import SeachCard from "../../../components/ProductCard/SeachCard";


const Shop = () => {
  const getProduct = useJimStore((state) => state.getProduct);
  const products = useJimStore((state) => state.products);
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className=" flex ">
      {
        // SearchBra
        <div className="w-1/4 p-4 bg-gray-300 h-screen">
          <SeachCard/>
        </div>
      }

      {
        //PRoduct
        <div className="w-1/2 p-4 h-screen overflow-auto">
          <p className="text-2xl font-bold mb-4">ຄັງສິນຄ້າທັງໝົດ</p>
          <div className="flex flex-wrap gap-4  justify-center">
            {products.map((item, index) => (
              <ProductCart key={index} item={item} />
            ))}
          </div>
        </div>
      }
      {
        //Cart
        <div className="w-1/4 p-4 h-screen overflow-auto bg-gray-300">Cart</div>
      }
    </div>
  );
};

export default Shop;
