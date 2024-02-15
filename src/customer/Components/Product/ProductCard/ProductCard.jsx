import React from "react";
import "./ProductCard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  getCart,
} from "../../../../Redux/Customers/Cart/Action";
import BackdropComponent from "../../BackDrop/Backdrop";
import Slider from "../ProductPage/components/Slider";

const ProductCard = ({ product }) => {
  const {
    title,
    brand,
    imageUrl,
    price,
    discountedPrice,
    color,
    discountPersent,
    description
  } = product;
  const { auth, cart } = useSelector((store) => store);
  const { cartItems } = cart;
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  console.log({ product });
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${product?._id}`);
  };

  return (
    <div className="productCard w-[15rem] h-min  m-3 transition-all cursor-pointer rounded-lg relative ">
      <div onClick={handleNavigate}>
        {" "}
        <div className="h-[13rem] p-1 relative">
         {product?.quantity < 1 && <div className="absolute top-0 right-0 p-2 px-3 bg-red-400 text-white font-medium text-xs">Sold Out</div>}
          <img
            className="h-full w-full object-fill object-center  rounded-t-lg "
            src={imageUrl[0]}
            alt=""
          />
          {/* <Slider images={Array.isArray(imageUrl)?imageUrl:[imageUrl]} /> */}
        </div>
        <div className="textPart bg-white p-3 ">
          <div>
            <p className="font-bold opacity-60">{brand}</p>
            <p className="truncate">{title}</p>

            <p className="font-semibold opacity-50">{color}</p>
          </div>

          <div className="flex space-x-2 items-center">
            <p className="font-semibold text-base">₹{Number.parseFloat(discountedPrice).toFixed(2)}</p>
            <p className="opacity-50 line-through text-sm">₹{price}</p>
            <p className="text-green-600 font-semibold text-xs">
              {Math.floor(discountPersent)}% off
            </p>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default ProductCard;
