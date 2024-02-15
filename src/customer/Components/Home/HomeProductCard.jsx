import React from "react";

import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();
  console.log({product})
  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="cursor-pointer flex flex-col items-center bg-white overflow-hidden w-[15rem] aspect-auto mx-3"
    >
      <div className="h-[10rem] w-[10rem] p-2 bg-slate-100  overflow-hidden">
        <img
          className="object-cover aspect-video  object-top w-full h-full"
          src={product?.image || product?.imageUrl[0]}
          alt={product?.title}
          loading="lazy"
        />
      </div>

      <div className="p-4 ">
        <h3 className="text-sm font-medium text-gray-700 truncate w-44">
          {product?.brand || product?.title}
        </h3>
        
        <div className="flex text-xs space-x-2 items-center">
            <p className="font-semibold">₹{Number.parseFloat(product?.discountedPrice).toFixed(2)}</p>
            <p className="opacity-50 line-through">₹{product?.price}</p>
           
          </div>
      </div>
    </div>
  );
};

export default HomeProductCard;
