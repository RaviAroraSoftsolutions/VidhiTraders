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
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { dressPage1 } from "../../../Data/dress/page1";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  findProducts,
} from "../../../Redux/Customers/Product/Action";
import { Category_level, SearchParmas } from "../../../utils/utils";
import { getCategory, getCategoryById } from "../../../Redux/Category/Action";
import BackdropComponent from "../../../customer/Components/BackDrop/Backdrop";
import SearchableDropdown from "../SearchableDropdown";
import { useConfirm } from "material-ui-confirm";
import { useDebounceSearch } from "../../../utils/useDebounce";

const ProductsTable = () => {
  const location = useLocation();
  const confirm = useConfirm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const {
    category: MainCategory,
    subcategory,
    loading:catLoading
  } = useSelector((store) => store?.adminCategory);
  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
    searchTerm:""
  });
  const debounceSearch=useDebounceSearch(filterValue?.searchTerm)
  useEffect(() => {
    (() => {
      let data2 = {
        level: Category_level?.TOP,
        pageNumber: 1,
        pageSize: 0,
        searchTerm:""
      };
      dispatch(getCategory(data2));
    })();
  }, []);
  // query
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page") || 1;
  const parent_category = searchParams.get("parent_category");

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    // setFilterValue({ availability, category, sort });
    const data = {
      category: filterValue?.category || "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: filterValue?.sort || "price_low",
      pageNumber: (filterValue?.searchTerm||filterValue?.parentCategory||filterValue?.category)?1:page ,
      pageSize: 10,
      stock: filterValue?.availability,
      searchTerm:debounceSearch,
      parent_category:filterValue?.parentCategory||""
    };
    dispatch(findProducts(data));
    setFilterValue((prev) => {
      return {
        ...prev,
        secondLavelCategory: subcategory?.find(
          (data) => data?._id === category
        ),
      };
    });
  }, [filterValue?.availability, filterValue?.parentCategory,filterValue?.category, filterValue?.sort, page, customersProduct.deleteProduct,debounceSearch]);

  const handleFilterChange = (e, sectionId) => {
   console.log("data=>>>",e.target.value)
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    // searchParams.set(sectionId, e.target.value);
    // const query = searchParams.toString();
    // navigate({ search: `?${query}` });
  };

  const handleDeleteProduct = (product) => {
   
    confirm({
      description:  <p className="font-medium">This will permanently delete <span className="font-bold">{product?.title}</span></p>,
    })
      .then(() => dispatch(deleteProduct(product?._id)))
      .catch(() => {});
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFilterValue(prevData=>({ ...prevData, [name]: value }));
  };
  return (
    <Box width={"100%"}>
      <BackdropComponent open={customersProduct?.loading} />
      <Card sx={{overflow:"visible"}} className="p-3 overflow-visible">
        <div
          style={{ justifyContent: "space-between", alignItems: "center" }}
          className="flex"
        >
          <CardHeader
            title="Products"
            sx={{
              alignItems: "center",
            }}
          />
          <Button
            onClick={() => navigate("/admin/product/create")}
            variant="contained"
          >
            Add Product
          </Button>
        </div>
        <Grid container spacing={2}>
        
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Availability
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.availability}
                label="Availability"
                onChange={(e) => handleFilterChange(e, "availability")}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"in_stock"}>Instock</MenuItem>
                <MenuItem value={"out_of_stock"}>Out Of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
                  <FormControl fullWidth>
                    <SearchableDropdown
                      titleKey={"name"}
                      labelTitle={"Category"}
                      placeholder={"Select Category..."}
                      options={MainCategory}
                      defaultVal={
                        MainCategory?.find(
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
                <Grid item xs={4}>
                  <FormControl fullWidth>
                  <SearchableDropdown
                      titleKey={"name"}
                      labelTitle={"SubCategory"}
                      options={subcategory}
                      loading={catLoading}
                      defaultVal={
                        subcategory?.find(
                          (data) => data?._id === filterValue?.category
                        )?.name
                      }
                      handleOption={(e) => {
                        setFilterValue((prev) => {
                          return { ...prev, category: e?._id };
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sort By Price
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.sort}
                label="Sort By Price"
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value={"price_high"}>Heigh - Low</MenuItem>
                <MenuItem value={"price_low"}>Low - Heigh</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="outlined-adornment-password"
                name="searchTerm"
                
                value={filterValue?.searchTerm}
                onChange={handleChange}
                type={"text"}
                placeholder="Search By Title,Category,SubCategory.,..."
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
          title="All Products"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Parent Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Discounted Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersProduct?.products?.map((item) => (
                <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    {" "}
                    <Avatar alt={item.titel} src={item.imageUrl} />{" "}
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
                        {item.title}
                      </Typography>
                      <Typography variant="caption">{item.brand}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {MainCategory?.find(cat=>cat?._id===item?.categoryData?.parentCategory)?.name||"N/A"}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item?.categoryData?.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item?.discountedPrice}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item?.quantity}
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="text"
                      onClick={() =>
                        navigate(`/admin/product/update/${item?._id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleDeleteProduct(item)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
        {/* <Pagination
          className="py-5 border w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        /> */}

        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            className="py-5 w-auto"
            size="large"
            page={Number(page)}
            count={Math.ceil(customersProduct?.totalCount / 10)}
            color="primary"
            onChange={handlePaginationChange}
          />
        </div>
      </Card>
    </Box>
  );
};

export default ProductsTable;
