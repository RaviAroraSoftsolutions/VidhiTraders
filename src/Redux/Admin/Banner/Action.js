import { toast } from "react-toastify";
import api, { API_BASE_URL } from "../../../config/api";
import { CREATE_BANNER_FAILURE, CREATE_BANNER_REQUEST, CREATE_BANNER_SUCCESS, GET_BANNER_FAILURE, GET_BANNER_REQUEST, GET_BANNER_SUCCESS, REMOVE_BANNER_FAILURE, REMOVE_BANNER_REQUEST, REMOVE_BANNER_SUCCESS } from "./ActionType";

export const getBanner = (payload) => async (dispatch) => {
    try {
      dispatch({ type: GET_BANNER_REQUEST });
  
      const { data } = await api.get(
        `${API_BASE_URL}/api/carousel/getCarousel`
      );
      let list=data?.carousel.Carousellist.map((listData) => {
        return { ...listData, label: listData?.name, value: listData?._id };
      })
     
      dispatch({
        type: GET_BANNER_SUCCESS,
        payload:{list:list,CarouselsCount:data?.carousel?.CarouselsCount
        } ,
      });
    } catch (error) {
      dispatch({
        type: GET_BANNER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const createBanner = (payload) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_BANNER_REQUEST });
  
      const { data } = await api.post(
        `${API_BASE_URL}/api/carousel/createCarousel`,
        payload
      );
      console.log("data=>>>>c", data);
      toast(data?.category?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
      if (data?.carousel?.createdCarousel ) {
        dispatch({
          type: CREATE_BANNER_SUCCESS,
          payload: data?.carousel?.createdCarousel,
        });
      }
  
      console.log("created product ", data);
    } catch (error) {
      dispatch({
        type: CREATE_BANNER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const removeBanner = (payload) => async (dispatch) => {
    try {
      dispatch({ type: REMOVE_BANNER_REQUEST });
  
      const { data } = await api.post(
        `${API_BASE_URL}/api/carousel/deleteCarousel`,
        payload
      );
      console.log("UPDATE-data=>>>>", data);
      toast(data?.carousel?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
      if (data?.carousel?.success) {
        dispatch({
          type: REMOVE_BANNER_SUCCESS,
          payload: payload,
        });
      }
    } catch (error) {
      dispatch({
        type: REMOVE_BANNER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };