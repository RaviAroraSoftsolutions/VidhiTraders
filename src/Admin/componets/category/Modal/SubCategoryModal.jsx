import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  createSubCategory,
  getCategory,
  updateSubCategory,
} from "../../../../Redux/Category/Action";
import { Category_level } from "../../../../utils/utils";
import { toast } from "react-toastify";
const SubCategoryModal = ({ modalDetails, handleClose }) => {
  const dispatch = useDispatch();
  const [subCategory, setSubCategory] = useState({ category:"", name: "" });
  const [isLoading,setIsLoading]=useState(false)
  const { isEdit, extraObject } = modalDetails;
  const { category: CategoryList,subcategory } = useSelector(
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
       
      setSubCategory((prev) => {
        return {
          ...prev,
          category: CategoryList?.find((a) => a?._id === extraObject?.catId),
          name: extraObject?.name,
        };
      });
    }
    
  }, [isEdit]);
   console.log({CategoryList,subcategory,subCategory})
  const handleSubmit = (e) => {
    console.log({subCategory})
    e.preventDefault();
    isEdit
      ? dispatch(
          updateSubCategory({
            name: subCategory?.name,
            parentCategory: subCategory?.category?._id,
            id: extraObject?.id,
          })
        )
      : dispatch(
          createSubCategory({
            name: subCategory?.name,
            parentCategory: subCategory?.category?._id,
            level: Category_level?.SECONDARY,
          })
        );
    setSubCategory({ categoryId: "", name: "" });
    handleClose();
  };
  const handleInvalidFill = () => {
    if (!subCategory?.category?._id) {
      return toast("Please Select Category First", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
    }
  };
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
                <label style={{ marginBottom: "15px" }}>Type</label>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={CategoryList}
                  value={
                    
                       subCategory?.category
                      
                  }
                  onChange={(e, val) =>
                    setSubCategory((prev) => {
                      return { ...prev, category: val };
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
                <label style={{ marginBottom: "15px" }}>SubCategory</label>
                <TextField
                  className="border border-black"
                  required
                  id="Sub-Category"
                  name="Sub-Category"
                  label="Sub-Category"
                  value={subCategory?.name}
                  fullWidth
                  onFocus={handleInvalidFill}
                  //   disabled={!subCategory?.categoryId}
                  onChange={(e) =>
                    setSubCategory((prev) => {
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

export default SubCategoryModal;
