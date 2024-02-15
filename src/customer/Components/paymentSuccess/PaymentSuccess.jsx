import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { payLater, updatePayment } from "../../../Redux/Customers/Payment/Action";
import { Alert, AlertTitle, Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarIcon from "@mui/icons-material/Star";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import OrderTraker from "../orders/OrderTraker";
import AddressCard from "../adreess/AdreessCard";
import { useLocation, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  // razorpay_payment_link_reference_id
  // razorpay_payment_id
  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const {orderId}=useParams();
  const location= useLocation()
  const {state}= location
  console.log({orderId})
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);
  const orderList= JSON.parse(localStorage.getItem("orderlist"))
  console.log("data=>>>",orderList)
  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"));
    setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
  }, []);
  
  useEffect(() => {
      const data = {jwt,orderData:{...orderList,paymentId:state?.data?.razorpay_payment_id}};
      if(state?.isPayLater){
       return dispatch(payLater(data))
      }
      dispatch(updatePayment(data));
      // 
      // dispatch(getOrderById(orderId));
    
  }, []);
  

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        {orderId==="success"?
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulation Your Order Get Placed
        </Alert>
        :
        <Alert
          variant="filled"
          severity="error"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Failed</AlertTitle>
          Oh! Your Order didn't Get Placed
        </Alert>
      }
      </div>

      <OrderTraker activeStep={1}/>

      <Grid container className="space-y-5 py-5 pt-20">
        {orderList?.orderItem.map((item) => (
          <Grid
            container
            item
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              {" "}
              <div className="flex  items-center ">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item?.product?.imageUrl[0]}
                  alt=""
                />
                <div className="ml-5 space-y-2">
                  <p className="">{item.product.title}</p>
                  <p className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Color: pink</span> <span>Size: {item?.size}</span>
                  </p>
                  <p>Seller: {item?.product?.brand}</p>
                  <p>₹{item?.price}</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <AddressCard address={orderList?.shippingAddress} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PaymentSuccess;
