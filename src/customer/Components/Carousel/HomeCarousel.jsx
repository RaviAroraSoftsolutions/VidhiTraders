import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";
import BackdropComponent from "../BackDrop/Backdrop";
import { Box } from "@mui/material";

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = ({images,loading}) => {
  console.log("loading=>>>",{loading})
  const navigate = useNavigate();
  const item = images.map((item) => (
    <img
      className="cursor-pointer"
      // onClick={() => navigate(item.path)}
      src={item?.image}
      alt=""
      style={{objectFit:"fill",width:"100%",aspectRatio: 211 / 80,maxHeight:"45dvh",borderRadius:"20px"}}
      onDragStart={handleDragStart}
      role="presentation"
    />
  ));

  return (
    <div className="">
    <BackdropComponent open={loading}/>
    <div className="px-10">
      <AliceCarousel
        mouseTracking
        items={item}
        autoPlay
        infinite
        autoPlayInterval={2000}
        disableButtonsControls
        autoWidth={true}
        
      />
    </div>
    </div>
  );
};

export default HomeCarousel;
