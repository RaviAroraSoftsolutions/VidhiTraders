import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  REMOVE_ADDRESS_REQUEST,
  REMOVE_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_FAILURE,
  GET_LOGO_REQUEST,
  GET_LOGO_FAILURE,
  GET_LOGO_SUCCESS,
  CREATE_LWT_REQUEST,
  CREATE_LWT_SUCCESS,
  CREATE_LWT_FAILURE,
} from "./ActionTypes";
import api, { API_BASE_URL } from "../../config/api";
import { toast } from "react-toastify";

// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) localStorage.setItem("jwt", user.jwt);
   
    dispatch(registerSuccess(user));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (user.jwt) localStorage.setItem("jwt", user.jwt);
    
    dispatch(loginSuccess(user));
  } catch (error) {
    toast(error?.response?.data?.error||error?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
    dispatch(loginFailure(error.message));
  }
};

//  get user from token
export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    }
  };
};
export const updateUser = (data, token) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/users/updateProfile`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({type:UPDATE_USER_SUCCESS,payload:response?.data})
    } catch (error) {
      const errorMessage = error.message;

      dispatch({ type: UPDATE_USER_FAILURE, payload: errorMessage });
    }
  };
};
export const addAddress=(payload,token)=>{
  return async (dispatch)=>{
    dispatch({type:ADD_ADDRESS_REQUEST});
    try {
      const {data}= await axios.post( `${API_BASE_URL}/api/users/addAddress`,payload,
      { headers: { Authorization: `Bearer ${token}` } })
     
      dispatch({type:ADD_ADDRESS_SUCCESS,payload:data?.user})

      toast(data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
    }
    catch (error) {
      const errorMessage = error.message;

      dispatch({ type: ADD_ADDRESS_FAILURE, payload: errorMessage });
    }
  }
}
export const updateAddress=(data,token)=>{
  return async (dispatch)=>{
    dispatch({type:UPDATE_ADDRESS_REQUEST});
    try {
      const response= await axios.post( `${API_BASE_URL}/api/users/updateAddress`,data,
      { headers: { Authorization: `Bearer ${token}` } })
     
      dispatch({type:UPDATE_ADDRESS_SUCCESS,payload:response?.data?.address})
      toast(response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        progress: undefined,
        theme: "light",
      });
    }
    catch (error) {
      const errorMessage = error.message;

      dispatch({ type: UPDATE_ADDRESS_FAILURE, payload: errorMessage });
    }
  }
}
export const removeAddress=(id,token)=>{
  return async (dispatch)=>{
    dispatch({type:REMOVE_ADDRESS_REQUEST});
    try {
      const response= await axios.post( `${API_BASE_URL}/api/users/deleteAddress`,{_id:id},
      { headers: { Authorization: `Bearer ${token}` } })
     
      dispatch({type:REMOVE_ADDRESS_SUCCESS,payload:{id}})
    }
    catch (error) {
      const errorMessage = error.message;

      dispatch({ type: REMOVE_ADDRESS_FAILURE, payload: errorMessage });
    }
  }
}
export const getLogoDetails=(token)=>async(dispatch)=>{
  dispatch({type:GET_LOGO_REQUEST})
  try{
    const response= await axios.get( `${API_BASE_URL}/api/admin/profile`,
    { headers: { Authorization: `Bearer ${token}` } })
   
    dispatch({type:GET_LOGO_SUCCESS,payload:response?.data?.profile})
  }
  catch(error){
    dispatch({type:GET_LOGO_FAILURE})
  }
}
export const createLogoDetails=(payload,token)=>async(dispatch)=>{
  dispatch({type:CREATE_LWT_REQUEST})
  try{
    const response= await axios.post( `${API_BASE_URL}/api/admin/profile`,payload,
    { headers: { Authorization: `Bearer ${token}` } })
   
    dispatch({type:CREATE_LWT_SUCCESS,payload:response?.data?.profile})
  }
  catch(error){
    dispatch({type:CREATE_LWT_FAILURE})
  }
}
export const logout = (navigate) => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
    navigate("/");
  };
};
