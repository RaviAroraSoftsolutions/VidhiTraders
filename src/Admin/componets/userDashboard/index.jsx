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
    CircularProgress
  } from "@mui/material";
  
  import React, { useRef } from "react";
  import { dressPage1 } from "../../../Data/dress/page1";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useState } from "react";
  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { deleteProduct, findProducts, getImageUrl } from "../../../Redux/Customers/Product/Action";
  import CategoryModal from "./Modal/CategoryModal";
  import { getCategory, removeCategory } from "../../../Redux/Category/Action";
  import { Category_level } from "../../../utils/utils";
  import moment from "moment";
import { toast } from "react-toastify";
import { GET_LOGO_SUCCESS } from "../../../Redux/Auth/ActionTypes";
import { createLogoDetails } from "../../../Redux/Auth/Action";
  
  const UserDasboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = useSelector((store) => store?.adminCategory);
    const [filterValue, setFilterValue] = useState({
      availability: "",
      category: "",
      sort: "",
    });
  const [modelDetails,setModalDetails]= useState({isOpen:false,isEdit:false,extraObject:{}})
  const [isImageLoading, setIsImageLoading] = useState(false);
    // query 
    const searchParams = new URLSearchParams(location.search);
    const jwt = localStorage.getItem("jwt");
    const availability = searchParams.get("availability");
    // const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const pageNumber = searchParams.get("page") || 1;
    const hiddenFileInput = useRef();
  
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
    
  }
      dispatch(getCategory(data));
    }, [pageNumber]);
   const handleUpdateCategory=(category)=>{
    setModalDetails({
      isOpen:true,
      isEdit:true,
      extraObject:{id:category?._id,name:category?.name}
    })
   }
    const handleFilterChange = (e, sectionId) => {
      console.log(e.target.value, sectionId);
      setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
      searchParams.set(sectionId, e.target.value);
      const query = searchParams.toString();
      navigate({ search: `?${query}` });
    };
  
    const handleDeleteCategory=(productId)=>{
      
      dispatch(removeCategory({_id:productId,isDeleted:true}))
    }
   const handleClose=()=>{
    setModalDetails({
      isOpen:false,
      isEdit:false,
      extraObject:{}
    })
   }
   const handleChange=async(e)=>{
    const {name,value,files}=e?.target
    if (name === "productImage") {
      try {
        setIsImageLoading(true);

        const formData = new FormData();
        formData.append("file", files[0]);
        let res = await getImageUrl(formData);
       
            // if(video_extensions.find(ext=>ext===url_extension)){
            //   setIsVideo(true)
            // }
           
       
        toast("Logo Uploaded Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          progress: undefined,
          theme: "light",
        });
        dispatch({type:GET_LOGO_SUCCESS,payload:{logo:res?.Location}})
        dispatch(createLogoDetails({logo:res?.Location,companyName:""},jwt))
       
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
   }
   const openModal=()=>{
    setModalDetails({
      isOpen:true,
      isEdit:false,
      extraObject:{}
    })
   }
   console.log({category})
    return (
      <Box width={"100%"}>
        {/* <CategoryModal modalDetails={modelDetails} handleClose={handleClose} /> */}
        <Card className="mt-2">
          <Box  sx={{ display: 'flex',justifyContent:"space-between", alignItems:"center",marginInline:"10px" }}>
            <CardHeader
              title="All Dashboard"
              sx={{
                pt: 2,
                alignItems: "center",
                "& .MuiCardHeader-action": { mt: 0.6 },
              }}
            />
             <Grid item display={"flex"} gap={"10px"} xs={12}>
             
              <Button
                onClick={() => {
                  hiddenFileInput.current.click();
                }}
                variant="outlined"
                sx={{ paddingBlock: "10px", paddingInline: "5px" }}
              >
                {!isImageLoading ? (
                   <Typography
                   sx={{
                     fontWeight: 500,
                     fontSize: "0.875rem !important",
                   }}
                 >
                   Add Logo
                 </Typography>
                ) : (
                  <CircularProgress color="secondary" />
                )}
              </Button>
              <input
                // accept="image/*,video/*"
                accept="image/*"
                name="productImage"
                type="file"
                onChange={handleChange}
                ref={hiddenFileInput}
                style={{ display: "none" }} // Make the file input element invisible
              />
            </Grid>
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
                      <Button variant="text" color='error' onClick={()=>handleDeleteCategory(item._id)}>Delete</Button>
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
  
  export default UserDasboard;
  