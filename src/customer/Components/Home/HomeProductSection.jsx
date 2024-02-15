import AliceCarousel from "react-alice-carousel";
import HomeProductCard from "./HomeProductCard";
import "./HomeProductSection.css";
import { Button } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useState } from "react";
import BackdropComponent from "../BackDrop/Backdrop";

const HomeProductSection = ({ section, data,dashboardLoading }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const responsive = {
    0: {
      items: 2,
      itemsFit: "contain",
    },
    568: {
      items: 3,
      itemsFit: "contain",
    },
    1024: {
      items: 5.5,
      itemsFit: "contain",
    },
  };
  const items = data?.slice(0, 10).map((item) => (
    <div className="">
      {" "}
      <HomeProductCard product={item} />
    </div>
  ));

  // const slideInFromRight = (t) => {
  //   return `translateX(${100 - t * 100}%)`;
  // };

  return (
    <>
    <BackdropComponent open={dashboardLoading}/>
    <div className="relative px-4 sm:px-6 lg:px-8 ">
      <h2 className="text-xl font-semibold text-gray-600 py-5">{section}</h2>
      <div className="relative  p-5">
        
        <AliceCarousel
        autoHeight
          disableDotsControls 
          items={items}
          responsive={responsive}
          animationType="slide"
          animationDuration={800}
          controlsStrategy="responsive"
          keyboardNavigation={true}
          renderPrevButton={({ isDisabled }) => {
            return <button disabled={isDisabled} className={`p-4 ${isDisabled &&"hidden"} rounded-full  hover:bg-slate-400 opacity-75 hover:cursor-pointer absolute -left-5 top-1/4`}><ArrowCircleLeftIcon/></button>
          }}
          renderNextButton={({ isDisabled }) => {
            return <p className={`p-4 ${isDisabled &&"hidden"} rounded-full  hover:bg-slate-400 opacity-75 hover:cursor-pointer  absolute -right-10 top-1/4 rotate-180`}><ArrowCircleLeftIcon/></p>
          }}
        />
       
      </div>
    </div>
    </>
  );
};

export default HomeProductSection;
