import React from "react";
import CartItem from "./CartItem";
import { Badge, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import BackdropComponent from "../BackDrop/Backdrop";
import { useState } from "react";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const [toggle,setToggle]= useState(false)
  const { auth, cart } = useSelector((store) => store);
  console.log("cart ", cart);

  useEffect(() => {
    dispatch(getCart(jwt));
  }, [jwt,toggle]);

  return (
    <>
      <BackdropComponent open={cart?.loading} />
      <div className="">
        {auth?.user ? (
          <>
            {cart.cartItems.length > 0 ? (
              <div className="lg:grid grid-cols-3 lg:px-16 relative">
                <div className="lg:col-span-2 lg:px-5 bg-white">
                  <div className=" space-y-3">
                    {cart.cartItems.map((item) => (
                      <>
                        <CartItem item={item} showButton={true} setToggle={setToggle} toggle={toggle} />
                      </>
                    ))}
                  </div>
                </div>
                <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
                  <div className="border p-5 bg-white shadow-lg rounded-md">
                    <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
                    <hr />

                    <div className="space-y-3 font-semibold">
                      <div className="flex justify-between pt-3 text-black ">
                        <span>Price ({cart.cart?.totalItem} item)</span>
                        <span>₹{cart.cart.totalPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <span className="text-green-700">
                          -₹{cart.cart?.discounte}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Charges</span>
                        <span className="text-green-700">Free</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span className="text-green-700">
                          ₹{cart.cart?.totalDiscountedPrice}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate("/checkout?step=2")}
                      variant="contained"
                      type="submit"
                      sx={{
                        padding: ".8rem 2rem",
                        marginTop: "2rem",
                        width: "100%",
                      }}
                    >
                      Check Out
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  height: "70vh",
                  width: "100%",
                  display: "grid",
                  placeItems: "center",
                  placeContent: "center",
                }}
              >
                <ShoppingCartCheckoutIcon
                  sx={{ width: "100px", height: "100px" }}
                />
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.875rem !important",
                    marginTop: "10px",
                  }}
                >
                  Please Add Items to Cart
                </Typography>
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              height: "70vh",
              width: "100%",
              display: "grid",
              placeItems: "center",
              placeContent: "center",
            }}
          >
            <RemoveShoppingCartIcon sx={{ width: "100px", height: "100px" }} />
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "0.875rem !important",
                marginTop: "10px",
              }}
            >
              Please {<Link to="/login">Sign In </Link>} to your Account First
            </Typography>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
