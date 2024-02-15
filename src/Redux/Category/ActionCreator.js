import {

  GET_CATEGORY_FAILURE,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,

} from "./ActionType";

export const getCategoryRequest = () => {
  return {
    type: GET_CATEGORY_REQUEST,
  };
};

export const getCategorySuccess = (category) => {
  return {
    type: GET_CATEGORY_SUCCESS,
    payload: category,
  };
};

export const getCategoryFailure = (error) => {
  return {
    type: GET_CATEGORY_FAILURE,
    payload: error,
  };
};

