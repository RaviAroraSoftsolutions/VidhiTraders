import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddDeliveryAddressForm from "./AddAddress";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import BackdropComponent from "../BackDrop/Backdrop";
import { createOrder } from "../../../Redux/Customers/Order/Action";

const steps = [
  "Login",
  "Delivery Adress",
  "Order Summary",
  "Payment",
];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(1);
  const [deliveryAdd,setDeliveryAdd]= React.useState({})
  const [skipped, setSkipped] = React.useState(new Set());
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const {order}=useSelector(store=>store);
  const jwt = localStorage.getItem("jwt");
  const dispatch =useDispatch()
  const step = queryParams.get('step');
  const navigate=useNavigate();
 



  const handleNext = (add) => {
    let newSkipped = skipped;
   
    dispatch(createOrder({ address:deliveryAdd, jwt,isPaymentLater:false }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    navigate(`/checkout?step=${step-1}`)
  };



  const handleReset = () => {
    setActiveStep(0);
  };

  const handlePayment=()=>{
    console.log("handle payment")
  }

  return (
    <Box className="px-5 lg:px-32 " sx={{ width: "100%" }}>
      <BackdropComponent open={order?.loading} />
      <Stepper activeStep={step}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
         
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={step == 2}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            
          </Box>
          {/* <Typography sx={{ my: 6 }}>Title</Typography> */}

          <div className="my-5">
            {step == 2? <AddDeliveryAddressForm handleNext={handleNext} setDeliveryAdd={setDeliveryAdd} />:<OrderSummary deliveryAdd={deliveryAdd}/>}
          </div>

          {/* <AddDeliveryAddressForm handleNext={handleNext} /> */}

          
        </React.Fragment>
      )}
    </Box>
  );
}
