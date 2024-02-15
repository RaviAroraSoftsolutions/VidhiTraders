import { Box, CircularProgress, Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Resizer from "react-image-file-resizer";
import { getImageUrl } from "../../../../Redux/Customers/Product/Action";
const ImageCard = ({ url , index, handleImageSelection }) => {
  const [isImageLoading, setImageLoading] = useState(false);
  const hiddenFileInput = useRef();
  const handleImage = async (e) => {
    const { files } = e?.target;
    setImageLoading(true);
    const image = await resizeFile(files[0]);
    const formData = new FormData();
    formData.append("file", image);
    let res = await getImageUrl(formData);
    await handleImageSelection(res, index);
    setImageLoading(false);
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        280,
        "png",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  return (
    <Tooltip title="Add Image">
    <div
      className="border relative"
      onClick={() => {
        hiddenFileInput.current.click();
      }}
      style={{
        maxHeight: "280px",
        maxWidth: "200px",
        height: "100%",
        width: "100%",
      }}
    >
      {index === 0 && (
        <div
          style={{ borderRadius: "0px 0px 0px 10px",backgroundColor:"rgb(96 165 250 / 1)" }}
          className="absolute top-0 right-0 p-2 px-3 bg-blue-400 z-10 text-white font-medium text-xs"
        >
          Primary
        </div>
      )}
      <div className="border mx-auto" style={{ height: "100%", width: "100%" }}>
        {url ? (
          <img
            src={url}
            className="aspect-square object-fit object-contain w-full h-full"
            alt="product"
          />
        ) : (
          <div
            style={{ height: "280px", width: "200px" }}
            className="text-xs h-full p-1 flex relative   text-slate-300 my-auto mx-auto"
          >
            <div className="absolute w-full grid place-items-center  top-1/2">
              <Box
                variant="outlined"
                className=" h-5 w-5 rounded-full border flex upload-button bg-slate-300 justify-center items-center"
              >
                {!isImageLoading ? (
                  <AddIcon fontSize="12" />
                ) : (
                  <CircularProgress color="secondary" />
                )}
              </Box>
              <p className="mt-2">Add your Image Here</p>
            </div>

            <input
              // accept="image/*,video/*"
              accept="image/*"
              name="productImage"
              type="file"
              onChange={(e) => handleImage(e, index)}
              ref={hiddenFileInput}
              multiple
              style={{ display: "none" }} // Make the file input element invisible
            />
          </div>
        )}
      </div>
    </div>
    </Tooltip>
  );
};

export default ImageCard;
