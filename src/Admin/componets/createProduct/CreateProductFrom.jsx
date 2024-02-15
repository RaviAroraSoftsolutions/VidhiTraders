import { useEffect, useRef, useState } from "react";
import { Autocomplete, Box, CircularProgress, Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  FormControl,
 
} from "@mui/material";

import { Fragment } from "react";
import "./CreateProductForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  findProductById,
  getImageUrl,
  updateProduct,
} from "../../../Redux/Customers/Product/Action";
import { getCategory, getCategoryById } from "../../../Redux/Category/Action";
import {
  Category_level,
  image_extensions,
  video_extensions,
} from "../../../utils/utils";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import BackdropComponent from "../../../customer/Components/BackDrop/Backdrop";
import SearchableDropdown from "../SearchableDropdown";
import { CLEAR_PRODUCT } from "../../../Redux/Customers/Product/ActionType";
import ImageCard from "./component/imageCard";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];
const CreateProductForm = () => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const { product } = useSelector((store) => store?.customersProduct);
  const [productData, setProductData] = useState({
    imageUrl: ["","","",""],
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    pricePerKG: "",
    discountPersent: "",
    size: "",
    quantity: "",
    parentCategory: "",
    category: "",
    thirdLavelCategory: "",
    description: "",
  });
  const {
    category: MainCategory,
    subcategory,
    loading:catLoading
  } = useSelector((store) => store?.adminCategory);

  const { productId } = useParams();
  useEffect(() => {
    
   return ()=> dispatch({type:CLEAR_PRODUCT}) 
  }, []);
  useEffect(() => {
   
    let data2 = {
      level: Category_level?.TOP,
      pageNumber: 1,
      pageSize: 0,
      searchTerm:""
    };

    if (MainCategory?.length <= 0) {
      dispatch(getCategory(data2));
    }
    if (productId) {
      dispatch(findProductById({ productId }));
    }
    else {
      console.log("else=>>>")
     
    }
  }, [productId]);
  useEffect(() => {
    if (product) {
      const getSubCat = async () => {
        setLoading(true);
        let data = await dispatch(
          getCategoryById({
            parentCatId: product?.parentCategory,
            level: Category_level?.SECONDARY,
          })
        );

       
        for (let key in productData) {
          setProductData((prev) => ({
            ...prev,
            [key]: product[key],
            imageUrl:[product["imageUrl"][0],product["imageUrl"][1]||"",product["imageUrl"][2]||"",product["imageUrl"][3]||""],
            category: product?.category?._id,
          }));
        }
        setLoading(false);
      };
      getSubCat();
      
    }
   
  }, [product]);

  

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "quantity" || name === "size" || name === "price") {
      let isNumber = new RegExp("^[1-9][0-9]*$").test(value);
      if (!isNumber) {
        return toast.error("Quantity must be more than 0");
      }
    }
    if (name === "size" || name === "pricePerKG") {
      let size = name === "size" ? value : productData?.size;
      let pricePerKG = name === "pricePerKG" ? value : productData?.pricePerKG;

      if (size && pricePerKG) {
        setProductData((prev) => ({
          ...prev,
          price: Number(pricePerKG) * Number(size),
          discountedPrice:prev?.discountPersent?
            Number(pricePerKG) *
            Number(size) *
            (1 - Number(prev?.discountPersent) / 100):"",
        }));
      }
    }

    if (name === "discountedPrice") {
      if (!productData?.price) {
        return toast("Please Fill Price First", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          progress: undefined,
          theme: "light",
        });
      }
      return setProductData((prevState) => ({
        ...prevState,
        [name]: value,
        discountPersent:
          ((Number(productData?.price) - Number(value)) /
            Number(productData?.price)) *
          100,
      }));
    }
    if (name === "discountPersent") {
      if (!productData?.price) {
        return toast("Please Fill Price First", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          progress: undefined,
          theme: "light",
        });
      }
      return setProductData((prevState) => ({
        ...prevState,
        [name]: value,
        discountedPrice: Number(productData?.price) * (1 - Number(value) / 100),
      }));
    }
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 const handleImageSelection=async(res,index)=>{
 
  try {
   
    toast("Image Added Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
    let old_list=[...productData?.imageUrl]
     old_list[index]=res?.Location
    console.log({old_list})
    setProductData((prevState) => ({
      ...prevState,
      imageUrl: [...old_list],
    }));
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
    
  }
 }
  // const handleRemoveSize = (index) => {
  //   const sizes = [...productData.size];
  //   sizes.splice(index, 1);
  //   setProductData((prevState) => ({
  //     ...prevState,
  //     size: sizes,
  //   }));
  // };
 console.log({productData})
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!productData?.imageUrl[0]){
     return toast("Please Choose Primary Image for Product", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
    }
    setLoading(true);
    let payload = {
      ...productData,
      price: Number(productData?.price),
      size: Number(productData?.size),
      pricePerKG: Number(productData?.pricePerKG),
      discountedPrice: Number(productData?.discountedPrice),
      discountPersent: Number(productData?.discountPersent),
      quantity: Number(productData?.quantity),
      parentCategory: productData?.parentCategory,
      category: productData?.category,
    };
    productId
      ? await dispatch(
          updateProduct({ productId: productId, data: { ...payload }, jwt })
        )
      : await dispatch(
          createProduct({
            data: {
              ...payload,
            },
            jwt,
          })
        );
    setProductData({
          imageUrl: ["","","",""],
          brand: "",
          title: "",
          color: "",
          discountedPrice: "",
          price: "",
          discountPersent: "",
          size: initialSizes,
          quantity: "",
          parentCategory: "",
          category: "",
          description: "",
        });
    setLoading(false);
  };

  // const handleAddProducts=(data)=>{
  //   for(let item of data){
  //     const productsData={
  //       data:item,
  //       jwt,
  //     }
  //     dispatch(createProduct(productsData))
  //   }
  // }

  return (
    <Fragment className="createProductContainer ">
      <BackdropComponent open={loading} />
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        {`${!productId ? "Add New" : "Update"}`} Product
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <div className="flex gap-2">
          
          <Box sx={{gridTemplateColumns:"repeat(7, minmax(0, 1fr))"}}  className="grid gap-4">
            <Box sx={{gridColumn:{lg:"span 3 / span 3"},gridTemplateColumns:{xs:"repeat(4, minmax(0, 1fr))",md:"repeat(2, minmax(0, 1fr))"}}} className="col-span-7 md:mb-0 grid imgBox xs:col-span-2">
            {productData?.imageUrl.map((imgURL,index)=><ImageCard url={imgURL} index={index} handleImageSelection={handleImageSelection}/>)}
          
              
              
            </Box>
            <Box sx={{gridColumn:{xs:"span 7 / span 7",lg:"span 4 / span 4"},}} className="mt-3 md:mt-0 ">
              <Grid className=""  container spacing={2}>
               
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={productData.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Size of Packet (in Kg)"
                    name="size"
                    value={productData.size}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Price per Packet"
                    name="pricePerKG"
                    value={productData?.pricePerKG}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Discounted Price"
                    name="discountedPrice"
                    value={productData.discountedPrice}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Discount Percentage"
                    name="discountPersent"
                    value={productData.discountPersent}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <SearchableDropdown
                      titleKey={"name"}
                      labelTitle={"Category"}
                      placeholder={"Select Category..."}
                      options={MainCategory}
                      defaultVal={
                        MainCategory?.find(
                          (data) => data?._id === productData?.parentCategory
                        )?.name
                      }
                      handleOption={(e) => {
                        dispatch(
                          getCategoryById({
                            parentCatId: e?._id,
                            level: Category_level?.SECONDARY,
                          })
                        );
                        setProductData((prev) => {
                          return { ...prev, parentCategory: e?._id };
                        });
                      }}
                    />
                    
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                  <SearchableDropdown
                      titleKey={"name"}
                      labelTitle={"SubCategory"}
                      options={subcategory}
                      loading={catLoading}
                      defaultVal={
                        subcategory?.find(
                          (data) => data?._id === productData?.category
                        )?.name
                      }
                      handleOption={(e) => {
                        setProductData((prev) => {
                          return { ...prev, category: e?._id };
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    name="description"
                    rows={3}
                    onChange={handleChange}
                    value={productData.description}
                  />
                </Grid>
                {/* {productData.size.map((size, index) => (
                  <Grid container item spacing={3} >
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Size Name"
                        name="name"
                        value={size.name}
                        onChange={(event) => handleSizeChange(event, index)}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Quantity"
                        name="size_quantity"
                        type="number"
                        onChange={(event) => handleSizeChange(event, index)}
                        required
                        fullWidth
                      />
                    </Grid> </Grid>
              
                ))} */}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ p: 1.8 }}
                    className="py-20"
                    size="large"
                    type="submit"
                  >
                    {`${!productId ? "Add New" : "Update"}`} Product
                  </Button>
                  {/* <Button
                    variant="contained"
                    sx={{ p: 1.8 }}
                    className="py-20 ml-10"
                    size="large"
                    onClick={()=>handleAddProducts(dressPage1)}
                  >
                    Add Products By Loop
                  </Button> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </form>
    </Fragment>
  );
};

export default CreateProductForm;
