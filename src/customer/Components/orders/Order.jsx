import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useSyncExternalStore } from "react";
import OrderCard from "./OrderCard";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";
import BackdropComponent from "../BackDrop/Backdrop";
import { useState } from "react";
import { cancelOrder } from "../../../Redux/Admin/Orders/Action";
import { OrderStatus } from "../../../utils/utils";

const orderStatus = [
  { label: "All", value: "PLACED", checked: false },
  { label: "Delivered", value: "DELIVERED", checked: false },
  { label: "Cancelled", value: "CANCELLED", checked: false },
  // { label: "Returned", vlue: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const [orderStats, setOrderStats] = useState(orderStatus);
  const [currentOrderStats, setCurrentOrderStats] = useState(
    OrderStatus?.PLACED
  );
  const [toggle, setToggle] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderHistory({ jwt, status: currentOrderStats }));
  }, [jwt, toggle, currentOrderStats]);
  //   const filteredOptions = order?.filter((option) =>
  //   option?.orderStatus?.toLowerCase()?.includes(orderStats.find(data=>data?.checked)?.value?.toLowerCase())
  // );
  const handleFilter = (option) => {
    setOrderStats((prevList) =>
      prevList?.map((stats) =>
        stats?.value === option
          ? { ...stats, checked: true }
          : { ...stats, checked: false }
      )
    );
    setCurrentOrderStats(option);
  };
  const handleCancelOrder = async(orderId) => {
   await dispatch(cancelOrder(orderId));
   await dispatch(getOrderHistory({ jwt, status: currentOrderStats }));
    setToggle(!toggle);
  };
  console.log("users orders ", order.orders);
  return (
    <Box className="px-10">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5} className="">
          <div className="h-auto shadow-lg bg-white border p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filters</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>
              {orderStats.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    //   id={`filter-${section.id}-${optionIdx}`}
                    //   name={`${section.id}[]`}
                    // defaultValue={option.value}
                    onClick={() => handleFilter(option?.value)}
                    type="checkbox"
                    checked={option.checked}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    //   htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <Box className="space-y-5 ">
            <TableContainer>
              <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>

                    <TableCell sx={{ textAlign: "center" }}>Order Id</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Order Date</TableCell>
                    <TableCell>Delivery Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orders?.length > 0 &&
                    order.orders?.map((order) => {
                      
                       return <OrderCard
                          item={order}
                          order={order}
                          Status={order?.orderStatus}
                          handleCancelOrder={handleCancelOrder}
                        />
                     
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>

      <BackdropComponent open={order.loading} />
    </Box>
  );
};

export default Order;
