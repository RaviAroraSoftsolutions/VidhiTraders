import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
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
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from "../../../Redux/Customers/Product/Action";
import CategoryModal from "./Modal/CategoryModal";
import { getCategory, removeCategory } from "../../../Redux/Category/Action";
import { Category_level } from "../../../utils/utils";
import moment from "moment";
import { useConfirm } from "material-ui-confirm";
import BackdropComponent from "../../../customer/Components/BackDrop/Backdrop";
import { useDebounceSearch } from "../../../utils/useDebounce";

const Category = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm =useConfirm()
  const { category,loading,catCount } = useSelector((store) => store?.adminCategory);
  const [toggle,setToggle]= useState(false)
  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
    searchTerm:''
  });
const [modelDetails,setModalDetails]= useState({isOpen:false,isEdit:false,extraObject:{}})
  // query 
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const debounceSearch=useDebounceSearch(filterValue?.searchTerm)
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
  level:Category_level?.TOP,
  pageNumber:pageNumber,
  pageSize: 10,
  searchTerm:debounceSearch
  
}
    dispatch(getCategory(data));
  }, [pageNumber,debounceSearch,toggle]);
 const handleUpdateCategory=(category)=>{
  setModalDetails({
    isOpen:true,
    isEdit:true,
    extraObject:{category}
  })
 }
  const handleFilterChange = (e, sectionId) => {
    console.log(e.target.value, sectionId);
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleDeleteCategory=(category)=>{
    confirm({
      description:  <p className="font-medium">This will permanently delete <span className="font-bold">{category?.name}</span> Category,Sub-Category and its Products</p>,
    })
      .then(()=>dispatch(removeCategory({_id:category?._id,isDeleted:true}))).catch(()=>{})
    
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
 const handleChange = (event) => {
  const name = event.target.name;
  const value = event.target.value;

  setFilterValue({ ...filterValue, [name]: value });
}

  return (<>
    <BackdropComponent open={loading} />
    <Box width={"100%"}>
     
      {modelDetails?.isOpen &&<CategoryModal setToggle={setToggle} toggle={toggle} modalDetails={modelDetails} handleClose={handleClose} />}
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
        <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="outlined-adornment-password"
                name="searchTerm"
                
                value={filterValue?.searchTerm}
                onChange={handleChange}
                type={"text"}
                placeholder="Search Category by Name,..."
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
                label="Search Category"
              />
            </FormControl>
          </Grid>
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
              {category?.map((item) => (
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
                    <Button variant="text" onClick={()=>handleUpdateCategory(item)}>Edit</Button>
                    <Button variant="text" color='error' onClick={()=>handleDeleteCategory(item)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
       

        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
          page={Number(pageNumber)}
            count={Math.ceil(catCount/10)}
            color="primary"
            className=""
            onChange={handlePaginationChange}
          
          />
        </div>
      </Card>
    </Box>
    </>
  );
};

export default Category;
