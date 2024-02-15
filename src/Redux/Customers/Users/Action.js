import api, { API_BASE_URL } from "../../../config/api";
import {
  GET_USER_LIST_FAILURE,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
} from "./Action Type";

export const getCustomerList =
  ({ list_type, pageNumber, pageSize,searchTerm }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_USER_LIST_REQUEST });
      const { data } = await api.get(
        `${API_BASE_URL}/api/admin/users/getAllUsersByRole?role=${list_type}&pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`
      );

      dispatch({ type: GET_USER_LIST_SUCCESS, payload: {list:data?.Userlist,userCount:data?.UsersCount} });
    } catch (error) {
      dispatch({
        type: GET_USER_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
