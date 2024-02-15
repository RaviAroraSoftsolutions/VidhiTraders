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
import {
  deleteProduct,
  findProducts,
} from "../../../Redux/Customers/Product/Action";
//   import CategoryModal from "./Modal/CategoryModal";
import { getCategory, getCategoryById, getSubCategory, removeSubCategory } from "../../../Redux/Category/Action";
import { Category_level } from "../../../utils/utils";
import SubCategoryModal from "../category/Modal/SubCategoryModal";
import { useConfirm } from "material-ui-confirm";
import { useDebounceSearch } from "../../../utils/useDebounce";
import SearchableDropdown from "../SearchableDropdown";
import BackdropComponent from "../../../customer/Components/BackDrop/Backdrop";

const SubCategoryList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm = useConfirm()
  const { subcategory,category,loading,subCatCount } = useSelector((store) => store?.adminCategory);
  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
    searchTerm:"",
    parentCategory:""
  });
  const [modelDetails, setModalDetails] = useState({
    isOpen: false,
    isEdit: false,
    extraObject: {},
  });
  // query
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const debounceSearch=useDebounceSearch(filterValue?.searchTerm)
  // const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value - 1);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };
  
  useEffect(() => {
    // setFilterValue({ availability, category, sort });
    let data={
        level:Category_level?.SECONDARY,
        parentCategory:filterValue?.parentCategory,
        pageNumber:pageNumber,
        searchTerm:debounceSearch,
        pageSize: 10,
        
      }  
    dispatch(getSubCategory(data));
  }, [debounceSearch]);
  useEffect(() => {
    // setFilterValue({ availability, category, sort });
    let data2 = {
      level: Category_level?.TOP,
      pageNumber: 1,
      pageSize: 0,
      searchTerm:""
    };
    dispatch(getCategory(data2));
  }, []);
  const handleUpdateSubCategory = (subCat) => {
    
    setModalDetails({
      isOpen: true,
      isEdit: true,
      extraObject: {
        id: subCat?._id,
        name: subCat?.name,
        catId: subCat?.parentCategory,
      },
    });
  };
  const handleFilterChange = (e, sectionId) => {
    console.log(e.target.value, sectionId);
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
  
    setFilterValue({ ...filterValue, [name]: value });
  }
  const handleClose = () => {
    setModalDetails({
      isOpen: false,
      isEdit: false,
      extraObject: {},
    });
  };
  const openModal = () => {
    setModalDetails({
      isOpen: true,
      isEdit: false,
      extraObject: {},
    });
  };
  const handleDeleteSubCategory=(subCat)=>{
    confirm({
      description:  <p className="font-medium">This will permanently delete <span className="font-bold">{subCat?.name}</span> Category and its Products</p>,
    })
      .then(()=> dispatch(removeSubCategory({_id:subCat?._id,isDeleted:true}))).catch(()=>{})
   
  }

  return (
    <Box width={"100%"}>
      <BackdropComponent open={loading} />
     {modelDetails?.isOpen && <SubCategoryModal modalDetails={modelDetails} handleClose={handleClose} />}
      <Card className="mt-2">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginInline: "10px",
          }}
        >
          <CardHeader
            title="All Sub Category"
            sx={{
              pt: 2,
              alignItems: "center",
              "& .MuiCardHeader-action": { mt: 0.6 },
            }}
          />
          <Button onClick={() => openModal()} variant="contained">
            Add SubCategory
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginInline: "10px",
            gap:"1rem"
          }}
        >
        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="outlined-adornment-password"
                name="searchTerm"
                
                value={filterValue?.searchTerm}
                onChange={handleChange}
                type={"text"}
                placeholder="Search Sub-Category by Name,..."
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
                label="Search Sub Category"
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
              <FormControl fullWidth>
                <SearchableDropdown
                  titleKey={"name"}
                  options={category}
                  placeholder={"Search Category"}
                  defaultVal={
                    category?.find(
                      (data) => data?._id === filterValue?.parentCategory
                    )?.name
                  }
                  handleOption={(e) => {
                    dispatch(
                      getCategoryById({
                        parentCatId: e?._id,
                        level: Category_level?.SECONDARY,
                      })
                    );
                    setFilterValue((prev) => {
                      return { ...prev, parentCategory: e?._id };
                    });
                  }}
                />

              </FormControl>
            </Grid>
            </Box>
        <TableContainer sx={{minHeight:"40vh"}} >
          <Table sx={{ minWidth: 800, }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Id</TableCell>

                <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subcategory?.length>0?
              subcategory?.map((item) => (
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
                        {item?._id}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="text"
                      onClick={() => handleUpdateSubCategory(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleDeleteSubCategory(item)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )):<p className="text-sm text-white my-2 grid place-items-center py-5">No Data Found</p>}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
      <Pagination
            className="py-5 w-auto"
            size="large"
            page={pageNumber}
            count={Math.ceil(subCatCount / 10)}
            color="primary"
            onChange={handlePaginationChange}
          />
      </Card>
    </Box>
  );
};

export default SubCategoryList;
