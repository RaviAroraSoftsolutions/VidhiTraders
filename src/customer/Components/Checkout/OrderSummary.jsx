import React, { useState } from "react";
import { Badge, Button, Menu, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrderById, phonePayPayment } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import { PayNow, createPayment } from "../../../Redux/Customers/Payment/Action";
import useRazorpay from "react-razorpay";
import { GET_CART_SUCCESS } from "../../../Redux/Customers/Cart/ActionType";
import { toast } from "react-toastify";
import BackdropComponent from "../BackDrop/Backdrop";
const token = localStorage.getItem('jwt');
const OrderSummary = ({deliveryAdd}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [Razorpay] = useRazorpay();
  const searchParams = new URLSearchParams(location.search);
  const [loading,setLoading]= useState(false)
  const {state}= location
const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {order,cart,auth}=useSelector(state=>state)
  const {user}= useSelector(state=>state?.auth)


useEffect(()=>{
  if(Object.keys(deliveryAdd)?.length<=0){
    navigate({ search: `step=2` });
  }

},[deliveryAdd])
function isDate(val) {
  // Cross realm comptatible
  return Object.prototype.toString.call(val) === '[object Date]'
}

function isObj(val) {
  return typeof val === 'object'
}

 function stringifyValue(val) {
  if (isObj(val) && !isDate(val)) {
    return JSON.stringify(val)
  } else {
    return val
  }
}

function buildForm({ action, params }) {
  const form = document.createElement('form')
  form.setAttribute('method', 'post')
  form.setAttribute('action', action)

  Object.keys(params).forEach(key => {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', key)
    input.setAttribute('value', stringifyValue(params[key]))
    form.appendChild(input)
  })

  return form
}

 function post(details) {
 
  const form = buildForm(details)
  document.body.appendChild(form)
  form.submit()
  form.remove()
}
const getData = (data) => {
  
  return fetch(`https://3198-2401-4900-569b-b840-156e-29cd-f802-f947.ngrok-free.app/api/payments/paytm`, {
    method: "POST",
    mode: 'cors',
    headers: {
      Accept: "*",
      "Content-Type": "application/json",
      "Authorization":`Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const handlePayment = async(e) => {
  e.preventDefault();
  handleClose()
  
   dispatch( PayNow({ amount: 1, email: "s12hubham.pandey@gmail.com" })).then((response)=>{
      var information = {
        // for production only
        action: "https://securegw.paytm.in/order/process",
        params: response?.data?.paytmParams,
      };
      console.log(response)
      post(information);
    })
   
    // getData({ amount: 1, email: "s12hubham.pandey@gmail.com" }).then((response) => {
      
    // }); }, 1500);
};
const handleCreatePayment=async()=>{
  handleClose()
  // const data={orderId:order.order?._id,jwt,Razorpay:Razorpay}
 
  const options = {
    key: "rzp_test_Dm4PdaaZGNqDII", // Enter the Key ID generated from the Dashboard
    name: "Acme Corp",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    amount:cart?.cart?.totalDiscountedPrice*100,
    // order_id:cart?.cart?._id,
    //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    handler: function (response) {
      
      dispatch(createOrder({ address:deliveryAdd, jwt,navigate,response,isPaymentLater:false }));
      
      dispatch({
        type: GET_CART_SUCCESS,
        payload: {},
      });
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
    },
    prefill: {
      name: user?.firstName+" "+user?.lastName,
      email:user?.email,
      
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
   
  };

  const rzp1 = new Razorpay(options);

  rzp1.on("payment.failed", function (response) {
    console.log("failed response=>>",response)
    toast.error("Payment Failed!! Please Try Again")
    // alert(response.error.code);
    // alert(response.error.description);
    // alert(response.error.source);
    // alert(response.error.step);
    // alert(response.error.reason);
    // alert(response.error.metadata.order_id);
    // alert(response.error.metadata.payment_id);
  });
  rzp1.on("payment.success",(resp)=>{
    console.log("onSuccess",resp)
    
  })
  rzp1.open();
 
  // dispatch(createPayment(data))
}
const handlePhonePayPayment=async()=>{
  handleClose()
  const data ={
    name: auth?.user?.firstName+" "+auth?.user?.lastName,
    amount: cart?.cart?.totalDiscountedPrice,
    number: auth?.user?.mobile,
    MUID: "MUID" + Date.now(),
    transactionId: 'T' + Date.now(),
}
setLoading(true)
const resp= await phonePayPayment(data,jwt)

let url= resp?.data?.instrumentResponse?.redirectInfo?.url

let link=document.createElement("a")
link.href=url

document.body.appendChild(link)
link.click()
setLoading(false)

}
const handlePaylater=()=>{
  handleClose()
  dispatch(createOrder({ address:deliveryAdd, jwt,navigate,isPaymentLater:true }));
}

  return (
    <div>
      <BackdropComponent open={loading} />
      <div className="space-y-5">
          <div className="p-5 shadow-lg rounded-md border ">
              <AddressCard address={deliveryAdd}/>
          </div>
        <div className="lg:grid grid-cols-3 relative justify-between">
          <div className="lg:col-span-2 ">
            <div className=" space-y-3">
              {cart?.cartItems?.map((item) => (
                <>
                  <CartItem item={item} showButton={false}/>
                </>
              ))}
            </div>
          </div>
          <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
              <hr />
              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black ">
                  <span>Price ({cart.cart?.totalItem} item)</span>
                  <span>₹{cart.cart?.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-700">-₹{cart?.cart?.discounte}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">₹{cart?.cart?.totalDiscountedPrice}</span>
                </div>
              </div>
              <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Payment Option
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem  onClick={handlePhonePayPayment}>Make Payment</MenuItem>
          <MenuItem onClick={handlePaylater}>Pay Later</MenuItem>
      
        </Menu>
      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
