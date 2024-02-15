import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createCategory, updateCategory } from "../../../../Redux/Category/Action";
import ImageCard from "../../createProduct/component/imageCard";
const CategoryModal = ({ modalDetails, handleClose,toggle,setToggle }) => {
  const dispatch = useDispatch();
  const {isEdit,extraObject}= modalDetails
  const [categoryData, setCategoryData] = useState({
    imageUrl:"",
    name:"",
    description:""
  });
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

  useEffect(()=>{
    if(isEdit){
      console.log({extraObject})
        setCategoryData(prev=>({...prev,...extraObject?.category}))
    }
  },[isEdit])
  const handleSubmit = (e) => {
    e.preventDefault();
   isEdit?dispatch(
    updateCategory({
      name: categoryData?.name,       
      imageUrl: categoryData?.imageUrl,       
      description: categoryData?.description,            
      _id:categoryData?._id
    })
  ): dispatch(
      createCategory({
        name: categoryData?.name,       
        imageUrl: categoryData?.imageUrl,       
        description: categoryData?.description,       
        level: 1,
      })
    );
    setToggle(!toggle)
    setCategoryData({
      imageUrl:"",
      name:"",
      description:""
    })
    handleClose()
  };
  const handleImage=(res)=>{
    let imgjson={target:{name:"imageUrl",value:res?.Location}}
    console.log(imgjson)
    handleChange(imgjson)
  }
  const handleChange=(e)=>{
    const {name,value}= e?.target
    setCategoryData(prevData=>({...prevData,[name]:value}))
  }
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
            <Grid
              sx={{ gap: "10px", flexDirection: "column", alignItems: "start" }}
              className="mx-auto flex flex-col justify-start items-center gap-2"
              item
              xs={3}
            >
              <label style={{ marginBottom: "15px" }}>Category</label>
              {/* <div className="mx-auto ">
                <ImageCard url={categoryData?.imageUrl} index={0} handleImageSelection={(res)=>handleImage(res)}/>
              </div> */}
              <TextField
                className="border border-black"
                required
                sx={{marginTop:"0.5rem"}}
                id="Category"
                name="name"
                label="Category Title"
                value={categoryData?.name}
                fullWidth
                onChange={handleChange}
                autoComplete="given-name"
              />
            </Grid>
            <Grid sx={{marginBlock:"10px"}} item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    name="description"
                    rows={3}
                    onChange={handleChange}
                    value={categoryData.description}
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

export default CategoryModal;
