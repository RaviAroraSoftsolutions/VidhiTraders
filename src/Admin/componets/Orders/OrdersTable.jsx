import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  Paper,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Select } from "@mui/material";
import { dressPage1 } from "../../../Data/dress/page1";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../../Redux/Admin/Orders/Action";
import { configure } from "@testing-library/react";
import { getOrdersSuccess } from "../../../Redux/Admin/Orders/ActionCreator";
import moment from "moment";
import BackdropComponent from "../../../customer/Components/BackDrop/Backdrop";
import { useDebounceSearch } from "../../../utils/useDebounce";
import { useConfirm } from "material-ui-confirm";

const OrdersTable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: "",
    sort: "",
    searchTerm: "",
  });
  const [orderStatus, setOrderStatus] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const confirm = useConfirm()
  const debounceSearch=useDebounceSearch(formData?.searchTerm)
  const jwt = localStorage.getItem("jwt");
  const { adminsOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const pageNumber = searchParams.get("page") || 1;
  const orderStats = searchParams.get("orderStats");
  useEffect(() => {
    const controller= new AbortController()
    dispatch(
      getOrders({
        jwt,
        pageNumber: (formData?.searchTerm||formData?.sort||formData?.status)?1:pageNumber,
        pageSize: 10,
        orderStatus: formData?.status,
        searchTerm: debounceSearch,
        signal:controller.signal
      })
    );
  }, [
    jwt,
    adminsOrder.delivered,
    adminsOrder.shipped,
    adminsOrder.confirmed,
    adminsOrder?.canceled,
    pageNumber,
    formData?.status,
    debounceSearch
  ]);
  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  // useEffect(()=>{
  //   dispatch(getOrders({jwt}))
  // },[])
  const filteredOptions = adminsOrder?.orders?.sort((a, b) =>
    formData?.sort === "Newest"
      ? new Date(a?.orderDate) - new Date(b?.orderDate)
      : new Date(b?.orderDate) - new Date(a?.orderDate)
  );

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(confirmOrder(orderId));
    setOrderStatus("CONFIRMED");
  };

  const handleShippedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(shipOrder(orderId));
    setOrderStatus("ShIPPED");
  };

  const handleDeliveredOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(deliveredOrder(orderId));
    setOrderStatus("DELIVERED");
  };
  const handleCancelOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(cancelOrder(orderId));
    setOrderStatus("CANCELLED");
  };

  const handleDeleteOrder = (order) => {
    console.log({order})
    handleUpdateStatusMenuClose();
    confirm({
      description:  <p className="font-medium">This will permanently delete <span className="font-bold">{order?.product?.title}</span> Order</p>,
    })
      .then(()=>dispatch(deleteOrder(order?._id))).catch(()=>{})
    ;
  };

  //   useEffect(()=>{
  // setUpdateOrderStatus(item.orderStatus==="PENDING"?"PENDING": item.orderStatus==="PLACED"?"CONFIRMED":item.orderStatus==="CONFIRMED"?"SHIPPED":"DELEVERED")
  //   },[adminsOrder.orders])
 console.log(pageNumber)
  return (
    <Box>
      <BackdropComponent open={adminsOrder?.loading} />
      <Card className="p-3">
        <CardHeader
          title="Order Table"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.status}
                label="Status"
                name="status"
                onChange={handleChange}
              >
                <MenuItem value={"ALL"}>ALL</MenuItem>
                <MenuItem value={"PLACED"}>PLACED</MenuItem>
                <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
                <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                <MenuItem value={"PENDING"}>PENDING</MenuItem>
                <MenuItem value={"CANCELLED"}>CANCELED</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.sort}
                name="sort"
                label="Sort By"
                onChange={handleChange}
              >
                <MenuItem value={"Newest"}>Newest</MenuItem>
                <MenuItem value={"Older"}>Older</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="outlined-adornment-password"
                name="searchTerm"
                
                value={formData?.searchTerm}
                onChange={handleChange}
                type={"text"}
                placeholder="Enter Title, Customer Name,Address,Mobile No.,..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search Term"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card className="mt-2">
        <CardHeader
          title="All Orders"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="table in dashboard"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Delivery Address</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOptions?.map((item, index) => {
                  return (
                    <TableRow
                      hover
                      key={item?.name}
                      sx={{
                        "&:last-of-type td, &:last-of-type th": { border: 0 },
                      }}
                    >
                      <TableCell sx={{}}>
                        <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                          <Avatar
                            alt={item.title}
                            src={item.product?.imageUrl}
                          />
                        </AvatarGroup>{" "}
                      </TableCell>

                      <TableCell
                        sx={{
                          py: (theme) => `${theme.spacing(0.5)} !important`,
                        }}
                      >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: "0.875rem !important",
                            }}
                          >
                            <Tooltip title={`${item.product?.title}`} arrow>
                              <div
                                style={{ width: "200px" }}
                                className="truncate break-words "
                              >
                                {item.product?.title}
                              </div>
                            </Tooltip>
                          </Typography>
                          <Typography variant="caption">
                            <span className="opacity-60">
                              {item?.product?.brand}
                            </span>
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>{item?._id}</TableCell>
                      <TableCell>{item?.discountedPrice}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {item?.quantity}
                      </TableCell>
                      <TableCell>
                        {moment(item?.orderDate).format("DD-MMM-YYYY")}
                      </TableCell>
                      <TableCell>
                        {item?.shippingAddress?.firstName +
                          " " +
                          item?.shippingAddress?.lastName}
                      </TableCell>
                      <TableCell>
                        {item?.shippingAddress?.streetAddress}
                      </TableCell>
                      <TableCell className="text-white">
                        <Chip
                          sx={{
                            color: "white !important",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                          label={item?.orderStatus}
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
                      <TableCell
                        sx={{ textAlign: "center" }}
                        className="text-white"
                      >
                        <div>
                          <Button
                            id={`basic-button-${item?._id}`}
                            aria-controls={`basic-menu-${item._id}`}
                            aria-haspopup="true"
                            aria-expanded={Boolean(anchorElArray[index])}
                            onClick={(event) =>
                              handleUpdateStatusMenuClick(event, index)
                            }
                          >
                            Status
                          </Button>
                          <Menu
                            id={`basic-menu-${item?._id}`}
                            anchorEl={anchorElArray[index]}
                            open={Boolean(anchorElArray[index])}
                            onClose={() => handleUpdateStatusMenuClose(index)}
                            MenuListProps={{
                              "aria-labelledby": `basic-button-${item._id}`,
                            }}
                          >
                            <MenuItem
                              onClick={() =>
                                handleConfirmedOrder(item?._id, index)
                              }
                              disabled={
                                item.orderStatus === "DELEVERED" ||
                                item.orderStatus === "SHIPPED" ||
                                item.orderStatus === "CONFIRMED"
                              }
                            >
                              CONFIRM ORDER
                            </MenuItem>
                            <MenuItem
                              disabled={
                                item.orderStatus === "DELIVERED" ||
                                item.orderStatus === "SHIPPED"
                              }
                              onClick={() =>
                                handleShippedOrder(item._id, index)
                              }
                            >
                              SHIP ORDER
                            </MenuItem>
                            <MenuItem
                              disabled={
                                item.orderStatus === "DELIVERED" ||
                                item.orderStatus === "CANCELLED"
                              }
                              onClick={() =>
                                handleDeliveredOrder(item._id, index)
                              }
                            >
                              DELIVER ORDER
                            </MenuItem>
                            <MenuItem
                              disabled={
                                item.orderStatus === "DELEVERED" ||
                                item.orderStatus === "CANCELLED"
                              }
                              onClick={() =>
                                handleCancelOrder(item?._id, index)
                              }
                            >
                              CANCEL ORDER
                            </MenuItem>
                          </Menu>
                        </div>
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: "center" }}
                        className="text-white"
                      >
                        <Button
                          onClick={() => handleDeleteOrder(item)}
                          variant="text"
                        >
                          delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Card>
      <Card className="mt-2 felx justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          page={Number(pageNumber)}
          count={Math.ceil(adminsOrder?.totalCount / 10)}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
  );
};

export default OrdersTable;
