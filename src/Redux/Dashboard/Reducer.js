
import {
 

    GET_DASHBOARD_REQUEST,
    GET_DASHBOARD_SUCCESS,
    GET_DASHBOARD_FAILURE,

  } from "./ActionTypes";
  
  const initialState = {
    loading: false,
    dashboardData:{},
    error: "",
  };
  
  const userDashboardReducer = (state = initialState, action) => {
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
          dashboardData: action.payload,
          error: "",
        };
      case GET_DASHBOARD_FAILURE:
        return {
          ...state,
          loading: false,
          dashboardData: {},
          error: action.payload,
        };
     
   
      default:
        return state;
    }
  };
  
  export default userDashboardReducer;
  