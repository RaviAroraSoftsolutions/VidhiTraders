
import { CREATE_BANNER_REQUEST, CREATE_BANNER_SUCCESS, GET_BANNER_FAILURE, GET_BANNER_REQUEST, GET_BANNER_SUCCESS, REMOVE_BANNER_SUCCESS } from "./ActionType";
import {


  } from "./ActionType";
  
  const initialState = {
    loading: false,
    bannerList:[],
    bannerCount:10,
    error: "",
  };
  
  const adminBannerReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_BANNER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_BANNER_SUCCESS:
        
        return {
          ...state,
          loading: false,
          bannerList: action.payload?.list,
          bannerCount:action?.payload?.CarouselsCount,
          error: "",
        };
      case GET_BANNER_FAILURE:
        return {
          ...state,
          loading: false,
          bannerList: [],
          error: action.payload,
        };
      case CREATE_BANNER_SUCCESS:
        return {
          ...state,
          loading: false,
          bannerList: [...state?.bannerList,action?.payload],
          error: action.payload,
        };

     
      case REMOVE_BANNER_SUCCESS:
        let filterd_category_list=state.bannerList.filter(cat=>cat?._id !== action?.payload?._id)
        return {
          ...state,
          loading: false,
          bannerList: [...filterd_category_list],
          error: {},
        }
      
       
     
     
      
   
      default:
        return state;
    }
  };
  
  export default adminBannerReducer;
  