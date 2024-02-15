import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField,CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { createCategory, updateCategory } from "../../../../Redux/Category/Action";
import { useRef } from "react";
import { getImageUrl } from "../../../../Redux/Customers/Product/Action";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { createBanner } from "../../../../Redux/Admin/Banner/Action";
const BannerModal = ({ modalDetails, handleClose }) => {
  const dispatch = useDispatch();
  const {isEdit,extraObject}= modalDetails
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [productData, setProductData] = useState({
    image: "",
   path: "",
  });
  const hiddenFileInput = useRef();
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


  

    
    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        if (name === "productImage") {
          try {
            setIsImageLoading(true);
    
            const formData = new FormData();
            formData.append("file", files[0]);
            let res = await getImageUrl(formData);
            
            toast("Image Added Successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              progress: undefined,
              theme: "light",
            });
            setProductData((prevState) => ({
              ...prevState,
              image: res?.Location,
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
            setIsImageLoading(false);
          }
        }
        setProductData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
  const handleSubmit = (e) => {
    e.preventDefault();
 dispatch(
    createBanner(productData)
    );
   setProductData({...productData,image:""})
    handleClose()
  };
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
          <Grid item display={"flex"} gap={"10px"} xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="image"
              value={productData.image}
              onChange={handleChange}
            />

            <Button
              onClick={() => {
                hiddenFileInput.current.click();
              }}
              variant="outlined"
              sx={{ paddingBlock: "10px", paddingInline: "5px" }}
            >
              {!isImageLoading ? (
                <AddIcon fontSize="12" />
              ) : (
                <CircularProgress color="secondary" />
              )}
            </Button>
            <input
              accept="image/*"
              name="productImage"
              type="file"
              onChange={handleChange}
              ref={hiddenFileInput}
              style={{ display: "none" }} // Make the file input element invisible
            />
          </Grid>
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

export default BannerModal;
