import React from "react";
import { ShoppingCart } from "lucide-react";
const ProductCart = ({item}) => {
  return (
    <div className="border rounded-b-md shadow-md p-2 w-48">
      <div>
        

        {
          item.images && item.images.length > 0 
          ? <img src={item.images[0].url} 
          className="rounded-md w-full h-24 object-cover transition-all hover:scale-105 transform hover:duration-200" />
          :  <div className="w-full h-24 bg-gray-200 rounded-md text-center flex items-center justify-center shadow">
          No images
        </div>
          
        }

       
      </div>
      <div className="py-2">
        <p className="text-xl">{item.name}</p>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>
      <div className="flex justify-end px-2">
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-2 rounded">
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
