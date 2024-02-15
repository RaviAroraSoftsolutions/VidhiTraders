import { API_BASE_URL } from '../../../config/api';
import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_LATER_SUCCESS,
    UPDATE_PAYMENT_LATER_REQUEST,
    UPDATE_PAYMENT_LATER_FAILURE,
  } from './ActionType';
  
  import axios from 'axios';
  
  export const createPayment = (reqData) => async (dispatch) => {
    console.log("create payment reqData ",reqData)
    try {
      dispatch({
        type: CREATE_PAYMENT_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${reqData.jwt}`,
        },
      };
  
      const { data } = await axios.post(`${API_BASE_URL}/api/payments/${reqData.orderId}`,reqData, config);
  console.log("datta",data)
  if(data.payment_link_url){
    window.location.href=data.payment_link_url;
  }
      dispatch({
        type: CREATE_PAYMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PAYMENT_FAILURE,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
  



  export const updatePayment = (reqData) => {
    return async (dispatch) => {
      console.log("update payment reqData ",reqData)
      dispatch(updatePaymentRequest());
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${reqData.jwt}`,
          },
        };
        const response = await axios.post(`${API_BASE_URL}/api/payments`,{orderData:reqData?.orderData},config);
       
        dispatch(updatePaymentSuccess(response.data));
      } catch (error) {
        dispatch(updatePaymentFailure(error.message));
        console.log("catch error ",error)
      }
    };
  };
  export const payLater=(reqData)=>{return async(dispatch)=>{
    dispatch(createPaymentLaterRequest())
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${reqData.jwt}`,
        },
        
      };
      const response = await axios.post(`${API_BASE_URL}/api/payments/paylater`,{orderData:reqData?.orderData},config);
      dispatch(createPaymentLaterSuccess(response.data));
    }
    catch(error){
      dispatch(createPaymentLaterFailure(error.message));
    }
  }}

  export const PayNow=(reqData)=>{return async()=>{
    try{
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${reqData.jwt}`,
        },
        
      };
      const response = await axios.post(`${API_BASE_URL}/api/payments/paytm`,reqData,config);
      return response

    }
    catch(err){

    }
  }}
export const updatePaymentRequest = () => {
  return {
    type: UPDATE_PAYMENT_REQUEST,
  };
};

export const updatePaymentSuccess = (payment) => {
  return {
    type: UPDATE_PAYMENT_SUCCESS,
    payload: payment,
  };
};

export const updatePaymentFailure = (error) => {
  return {
    type: UPDATE_PAYMENT_FAILURE,
    payload: error,
  };
};


export const createPaymentLaterRequest=()=>{
  return {type:UPDATE_PAYMENT_LATER_REQUEST}
}
export const createPaymentLaterSuccess=()=>{
  return {type:UPDATE_PAYMENT_LATER_SUCCESS}
}
export const createPaymentLaterFailure=()=>{
  return {type:UPDATE_PAYMENT_LATER_FAILURE}
}
 
  