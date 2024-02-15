import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { green, pink } from "@mui/material/colors";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Face2RoundedIcon from "@mui/icons-material/Face2Rounded";
import WidgetsIcon from '@mui/icons-material/Widgets';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";
import { getImageUrl } from "../Redux/Customers/Product/Action";
import { toast } from "react-toastify";
import { GET_USER_SUCCESS } from "../Redux/Auth/ActionTypes";
import { useEffect } from "react";
import { getUser } from "../Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import BackdropComponent from "../customer/Components/BackDrop/Backdrop";

import AccountSettingList from "../customer/Components/Profile/AccountSettingList";
import AccountSettingPages from "../customer/Components/Profile/AccountSettingPages";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Profile() {
  const { auth, cart } = useSelector((store) => store);
  const [selectedSetting,setSelectedSetting]= useState("profileInfo")
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hiddenFileInput = useRef();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    } else navigate("/");
  }, [jwt]);

  useEffect(() => {
    if (auth?.user) {
      setUserData(auth?.user);
    }
  }, [auth?.user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    console.log(name, value);
    if (name === "productImage") {
      try {
        setIsImageLoading(true);

        const formData = new FormData();
        formData.append("file", files[0]);
        let res = await getImageUrl(formData);

        toast("Image Added Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          progress: undefined,
          theme: "light",
        });
        setUserData((prev) => {
          return { ...prev, imageUrl: res?.Location };
        });
        return setIsImageLoading(false);
      } catch (error) {
        console.log(error);
        toast("Failed to Upload Image", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          progress: undefined,
          theme: "light",
        });
        setIsImageLoading(false);
      }
    }
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div className="py-3 bg-gray-200">
        <BackdropComponent open={auth?.isLoading} />
      <div
        style={{ width: "85%", height: "85vh" }}
        className="grid grid-cols-3 justify-start gap-2 mx-auto"
      >
        <div className="col-span-1 h-full">
          <div className="w-full h-full ">
            <div
              style={{ height: "15%", paddingInline: "1rem" }}
              className="w-full bg-white flex justify-start items-center h-1/5"
            >
              <Avatar className="my-auto" sx={{ bgcolor: green[500] }}>
                <Face2RoundedIcon fontSize="medium" />
              </Avatar>
              <p className="font-medium ml-2">Hello</p>
            </div>
            <div
              style={{ height: "83.5%" }}
              className="w-full bg-white mt-2 h-4/5 hover:cursor-pointer"
             
            >
                <div  onClick={()=> navigate("/account/order")} className="py-2 flex justify-between items-center border" style={{paddingInline:"1rem",paddingBlock:"1.3rem"}}>
                <div className="flex justify-start">
                    <WidgetsIcon fontSize="medium" color="primary" />
                    <p className="font-medium ml-2">ORDERS</p>
                </div>
                  <KeyboardArrowRightIcon/>
                </div>
                <div>
                <div className="py-2 flex justify-between items-center " style={{paddingInline:"1rem",paddingBlock:"1.3rem"}}>
                <div className="flex justify-start">
                    <AccountBoxIcon fontSize="medium" color="primary" />
                    <p className="font-medium ml-2">Account Setting</p>
                </div>
                 
                </div>
                <div className="px-5">
                    <AccountSettingList handleSelect={(setting)=>setSelectedSetting(setting?.key)} selectedSetting={selectedSetting} />
                </div>
                </div>
            </div>
          </div>
        </div>
        <div
          style={{ gridColumn: "2 / span 2" }}
          className=" bg-white h-full"
        >
        <AccountSettingPages userData={userData} selectedSetting={selectedSetting} handleChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
