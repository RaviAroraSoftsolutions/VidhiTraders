

import { GET_DASHBOARD_FAILURE, GET_DASHBOARD_REQUEST, GET_DASHBOARD_SUCCESS } from "./ActionType";
  
  const initialState = {
    loading: false,
    dashboard:[],
    error: "",
  };
  
  const adminDashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DASHBOARD_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_DASHBOARD_SUCCESS:
        return {
          ...state,
          loading: false,
          dashboard: action.payload,
          error: "",
        };
      case GET_DASHBOARD_FAILURE:
        return {
          ...state,
          loading: false,
          bannerList: [],
          error: action.payload,
        };
      
      
       
     
     
      
   
      default:
        return state;
    }
  };
  
  export default adminDashboardReducer;
  