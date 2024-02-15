import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import { dressPage1 } from "../../../Data/dress/page1";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from "../../../Redux/Customers/Product/Action";
import { getCategory, getProductCategory, getSubCategory, removeCategory, removeProductCategory } from "../../../Redux/Category/Action";
import { Category_level } from "../../../utils/utils";
import moment from "moment";
import ProductCategoryModal from "../category/Modal/ProductCategoryModal";

const ProductCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category,productcategory } = useSelector((store) => store?.adminCategory);
  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
  });
const [modelDetails,setModalDetails]= useState({isOpen:false,isEdit:false,extraObject:{}})
  // query 
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  // const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;


  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    // setFilterValue({ availability, category, sort });
let data={
  level:Category_level?.THIRD,
  pageNumber:pageNumber,
  pageSize: 10,
  
}
let data2 = {
  level: Category_level?.SECONDARY,
  pageNumber: 1,
  // pageSize: 10,
};
dispatch(getSubCategory(data2));
  dispatch(getProductCategory(data));
  }, [pageNumber]);
 const handleUpdateProductCategory=(productCat)=>{
  setModalDetails({
    isOpen: true,
    isEdit: true,
    extraObject: {
      id: productCat?._id,
      name: productCat?.name,
      itemCatId:productCat?.parentCategory
    },
  });
 }
  const handleFilterChange = (e, sectionId) => {
    console.log(e.target.value, sectionId);
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleProductDeleteCategory=(productId)=>{
    
    dispatch(removeProductCategory({_id:productId,isDeleted:true}))
  }
 const handleClose=()=>{
  setModalDetails({
    isOpen:false,
    isEdit:false,
    extraObject:{}
  })
 }
 const openModal=()=>{
  setModalDetails({
    isOpen:true,
    isEdit:false,
    extraObject:{}
  })
 }
 console.log("data=product=>>>",{productcategory})
  return (
    <Box width={"100%"}>

      <ProductCategoryModal modalDetails={modelDetails} handleClose={handleClose} />
      <Card className="mt-2">
        <Box  sx={{ display: 'flex',justifyContent:"space-between", alignItems:"center",marginInline:"10px" }}>
          <CardHeader
            title="All Category"
            sx={{
              pt: 2,
              alignItems: "center",
              "& .MuiCardHeader-action": { mt: 0.6 },
            }}
          />
          <Button onClick={()=>openModal()} variant="contained">Add Category</Button>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Created on</TableCell>
               
                <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productcategory?.map((item) => (
                <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  
                >
                  <TableCell>
                    {" "}
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item?.name}
                      </Typography>
                     
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item._id}
                      </Typography>
                      
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {moment(item.createdAt).format("DD-MMM-YYYY")}
                      </Typography>
                      
                    </Box>
                  </TableCell>
                  
              
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" onClick={()=>handleUpdateProductCategory(item)}>Edit</Button>
                    <Button variant="text" color='error' onClick={()=>handleProductDeleteCategory(item._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
        <Pagination
          className="py-5 border w-auto"
          size="large"

          count={10}
          color="primary"
          onChange={handlePaginationChange}
        />

        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          {/* <Pagination
            count={category.length}
            color="primary"
            className=""
            onChange={handlePaginationChange}
          
          /> */}
        </div>
      </Card>
    </Box>
  );
};

export default ProductCategory;
