import api, { API_BASE_URL } from "../../config/api";
import { GET_DASHBOARD_FAILURE, GET_DASHBOARD_REQUEST, GET_DASHBOARD_SUCCESS } from "./ActionTypes";

export const getDashboard = (payload) => async (dispatch) => {
    try {
      dispatch({ type: GET_DASHBOARD_REQUEST });
  
      const { data } = await api.get(
        `${API_BASE_URL}/api/dashboard/dashboardData?limit=10`
      );
     console.log("dashboard=>>>>>",data)
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