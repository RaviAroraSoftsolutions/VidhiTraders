// ** MUI Imports
import Grid from "@mui/material/Grid";
import AdminPannel from "../../Styles/AdminPannelWrapper";
import Achivement from "../tables/Achivement";
import MonthlyOverview from "../tables/MonthlyOverView";
import TotalEarning from "../tables/TotalEarning";
import CardStatsVertical from "../../Styles/CardStatsVertical";
import SalesByCountries from "../tables/SalesByContry";
import DepositWithdraw from "../tables/DepositeAndWithdraw";
import CustomersTable from "../tables/CustomersTable";
import { ThemeProvider, createTheme } from "@mui/material";
import { customTheme, darkTheme } from "../them/customeThem";
import "./Admin.css";
import RecentlyAddeddProducts from "../tables/RecentlyAddeddProducts";
import SalesOverTime from "../tables/SalesOverTime";
import RecentOrders from "../tables/RecentOrders";
import {AssuredWorkloadIcon }from '@mui/icons-material';
import { BriefcaseVariantOutline, CurrencyUsd, HelpCircleOutline, Poll } from "mdi-material-ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardDetails } from "../../Redux/Admin/Dashboard/Action";
import BackdropComponent from "../../customer/Components/BackDrop/Backdrop";
import MonthlyOrderOverview from "../tables/WeeklyOverview";

const darkTheme1 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#312d4b',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

// bg-[#28243d]
const Dashboard = () => {
  const dispatch =useDispatch()
  const {loading,dashboard}=useSelector((store)=>store?.adminDashboard)
  useEffect(()=>{
    dispatch(getDashboardDetails())
  },[])

  return (
    <div className="adminContainer ">
      <BackdropComponent open={loading} />
      <ThemeProvider theme={customTheme}>
        <AdminPannel>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} md={4}>
              <Achivement />
            </Grid> */}
            <Grid item xs={12} md={12}>
              <MonthlyOverview userData={dashboard?.user?.getAllCustomerCount} weekData={dashboard?.order?.getAllOrderCount} productData={dashboard?.product?.getAllProductCount} />
            </Grid>
            <Grid item xs={12} md={6} >
              <MonthlyOrderOverview weekData={dashboard?.order?.last30daysweekwiseData} />
            </Grid>
            <Grid item xs={12} md={6} >
              <SalesOverTime userData={dashboard?.user?.last30daysweekwiseData}/>
            </Grid>
            
            <Grid item xs={12} md={12} >
            <CustomersTable userData={dashboard?.user?.getResent5user} />
            </Grid>
            <Grid item xs={12} md={12} >
              <RecentOrders orders={dashboard?.order?.getResent5orders} />
            </Grid>
             <Grid item xs={12} md={12} >
              <RecentlyAddeddProducts products={dashboard?.product?.getResent5product} />
            </Grid>
           
           
           
          </Grid>
        </AdminPannel>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
