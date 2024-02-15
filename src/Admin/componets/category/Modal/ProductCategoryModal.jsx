import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  createProductCategory,
  createSubCategory,
  getCategory,
  getCategoryById,
  updateProductCategory,
  updateSubCategory,
} from "../../../../Redux/Category/Action";
import { Category_level } from "../../../../utils/utils";
import { toast } from "react-toastify";
const ProductCategoryModal = ({ modalDetails, handleClose }) => {
  const dispatch = useDispatch();
  const [productCategory, setProductCategory] = useState({ category:"", name: "",itemCategory:"" });
  const [isLoading,setIsLoading]=useState(false)
  const { isEdit, extraObject } = modalDetails;
  const { subcategory } = useSelector(
    (store) => store?.adminCategory
  );
  console.log(modalDetails)
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    // setFilterValue({ availability, category, sort });
    setIsLoading(true)
  
    if (isEdit) {
      console.log(subcategory?.find((a) => a?._id === extraObject?.itemCatId))
      setProductCategory((prev) => {
        return {
          ...prev,
          itemCategory: subcategory?.find((a) => a?._id === extraObject?.itemCatId),
          name: extraObject?.name,
        };
      });
      // getCategoryById(extraObject?.catId,Category_level?.SECONDARY)
    
    }

    
  }, [isEdit]);
   console.log({subcategory,productCategory})
  const handleSubmit = (e) => {  
    e.preventDefault();
    isEdit
      ? dispatch(
        updateProductCategory({
            name: productCategory?.name,
            parentCategory: productCategory?.itemCategory?._id,
            id: extraObject?.id,
          })
        )
      : dispatch(
        createProductCategory({
            name: productCategory?.name,
            parentCategory: productCategory?.itemCategory?._id,
            level: Category_level?.THIRD,
          })
        );
    setProductCategory({ categoryId: "", name: "" });
    handleClose();
  };
  const handleInvalidFill = () => {
    if (!productCategory?.category?._id) {
      return toast("Please Select Category First", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
    }

  };
  const handleInvalidFil2 = () => {
    if (!productCategory?.itemCategory?._id) {
      return toast("Please Select item Category First", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
    }

  };

  const getCategoryList=(parentCatId,level)=>{
    // console.log("clicked",parentCatId,level)
    dispatch(getCategoryById({parentCatId,level}))
  }
  if(isLoading && isEdit) <>Loading...</>
  return (
    <div>
      <Modal
        open={modalDetails?.isOpen}
        onClose={handleClose}
        className="blur-md"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col justify-center">
            <div className="flex gap-3" style={{ gap: "10px" }}>
              <Grid
                sx={{
                  gap: "10px",
                  flexDirection: "column",
                  alignItems: "start",
                  flexBasis: "50%",
                }}
                className="mx-auto flex flex-col justify-start items-center gap-2"
                item
                xs={3}
              >
                <label style={{ marginBottom: "15px" }}>Item</label>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={subcategory}
                  value={ 
                       productCategory?.itemCategory   
                  }
                  onFocus={handleInvalidFill}
                  onChange={(e, val) =>
                    setProductCategory((prev) => {
                      return { ...prev, itemCategory: val };
                    })
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                />
              </Grid>
              <Grid
                sx={{
                  gap: "10px",
                  flexDirection: "column",
                  alignItems: "start",
                  flexBasis: "50%",
                }}
                className="mx-auto flex flex-col justify-start items-center gap-2"
                item
                xs={3}
              >
                <label style={{ marginBottom: "15px" }}>Product</label>
                <TextField
                  className="border border-black"
                  required
                  id="Sub-Category"
                  name="Sub-Category"
                  label="Sub-Category"
                  value={productCategory?.name}
                  fullWidth
                  onFocus={handleInvalidFil2}
                  //   disabled={!subCategory?.categoryId}
                  onChange={(e) =>
                    setProductCategory((prev) => {
                      return { ...prev, name: e?.target?.value };
                    })
                  }
                  autoComplete="given-name"
                />
              </Grid>
            </div>
            <Button
              onClick={(e) => handleSubmit(e)}
              variant="contained"
              style={{ marginBlock: "15px" }}
              className="mx-3"
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductCategoryModal;
