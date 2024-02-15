import { toast } from "react-toastify";

import {  GET_DASHBOARD_FAILURE, GET_DASHBOARD_SUCCESS,  } from "./ActionType";
import api, { API_BASE_URL } from "../../../config/api";
import { GET_DASHBOARD_REQUEST } from "../../Dashboard/ActionTypes";

export const getDashboardDetails = (payload) => async (dispatch) => {
    try {
      dispatch({ type: GET_DASHBOARD_REQUEST });
  
      const { data } = await api.get(
        `${API_BASE_URL}/api/dashboard/getAdminDashboardData`
      );
      
      dispatch({
        type: GET_DASHBOARD_SUCCESS,
        payload: data?.dashboard,
      });
    } catch (error) {
      dispatch({
        type: GET_DASHBOARD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
