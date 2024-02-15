import {
  Box,
  Grid,
  Typography,
  Chip,
  Button,
  TableRow,
  TableCell,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";
import { capitalizeFirstLetter } from "../../../utils/utils";

const OrderCard = ({ item, order, Status, handleCancelOrder }) => {
  const navigate = useNavigate();
  

  return (
    <TableRow
    hover
    
    className="hover:cursor-pointer"
    sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 }, }}
  >
      
        <TableCell sx={{}}>
          <img
            className="w-[5rem] h-[5rem] object-cover object-top"
            src={item?.product?.imageUrl[0]}
            alt=""
          />{" "}
        </TableCell>

        <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "0.875rem !important",
              }}
            >
              <p className="">{item?.product?.title}</p>
            </Typography>
            {/* <Typography variant="caption">
              {item?.orderItems.map((order) => (
                <span className="opacity-60"> {order.product?.brand},</span>
              ))}
            </Typography> */}
          </Box>
        </TableCell>

        <TableCell>{item?._id}</TableCell>
        <TableCell>{item?.discountedPrice}</TableCell>
        <TableCell>{item?.quantity}</TableCell>
        <TableCell>{moment(item?.orderDate)?.format("DD-MMM-YYYY")}</TableCell>
        <TableCell>
          {moment(item?.orderDate).add(15, "days").format("DD-MMM-YYYY")}
        </TableCell>
        <TableCell>
          <Chip
            sx={{
              color: "white !important",
              fontWeight: "bold",
              textAlign: "center",
            }}
            label={Status}
            size="small"
            color={
              item.orderStatus === "PENDING"
                ? "info"
                : item?.orderStatus === "DELIVERED"
                ? "success"
                : "secondary"
            }
            className="text-white"
          />
        </TableCell>
        <TableCell>
        <div className="flex gap-2">
          <Button
                variant="contained"
                onClick={(e) => {e.preventDefault();navigate(`/account/order/${order?._id}`)}}
                color="info"
              >
                Info
              </Button>
            {(Status !== "DELIVERED" && Status !=="CANCELLED") && (
              <Button
                variant="contained"
                onClick={() => {const confirmBox = window.confirm(
                  "Do you really want to cancel this Order?"
                )
                if (confirmBox === true) {handleCancelOrder(item?._id)}}}
                color="error"
              >
                Cancel
              </Button>
        
          )}
         </div>
        </TableCell>
     
      
        </TableRow>
  );
};

export default OrderCard;
