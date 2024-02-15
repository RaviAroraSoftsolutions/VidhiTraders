import React from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBanner } from "../Redux/Admin/Banner/Action";
import { getDashboard } from "../Redux/Dashboard/Action";

const Homepage = () => {
  const { bannerList,loading } = useSelector((store) => store?.adminBanner);
  const { dashboardData,loading:dashboardLoading } = useSelector((store) => store?.userDasboard);
  const dispatch =useDispatch()
  useEffect(() => {
    // setFilterValue({ availability, category, sort });
     dispatch(getDashboard())
    dispatch(getBanner());
  }, []);
 
  return (
    <div className="bg-slate-100 my-2">
      <HomeCarousel images={bannerList} loading={loading} />

      <div  className="space-y-10 py-20 bg-white mt-2">
        
      {/* <HomeProductSection data={mens_kurta} section={"Men's Kurta"} /> */}
        {Object?.keys(dashboardData?.ProductList||{})?.map(data=><HomeProductSection data={dashboardData?.ProductList[data]} dashboardLoading={dashboardLoading} section={data} />)}
        {/* <HomeProductSection data={lengha_page1} section={"Lengha Choli"} /> */}
        {/* <HomeProductSection data={sareePage1} section={"Saree"} />
        <HomeProductSection data={dressPage1} section={"Dress"} />
        <HomeProductSection data={gounsPage1} section={"Women's Gouns"} />
        <HomeProductSection data={kurtaPage1} section={"Women's Kurtas"} /> */}
        {/* <HomeProductSection data={mensPantsPage1} section={"Men's Pants"} /> */}
      </div>

      
    </div>
  );
};

export default Homepage;
