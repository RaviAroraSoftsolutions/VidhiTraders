import axios from "axios";
import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  REMOVE_CATEGORY_REQUEST,
  REMOVE_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_FAILURE,
  CREATE_SUBCATEGORY_REQUEST,
  GET_SUBCATEGORY_SUCCESS,
  GET_SUBCATEGORY_FAILURE,
  CREATE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_FAILURE,
  UPDATE_SUBCATEGORY_REQUEST,
  REMOVE_SUBCATEGORY_REQUEST,
  REMOVE_SUBCATEGORY_SUCCESS,
  REMOVE_SUBCATEGORY_FAILURE,
  GET_SUBCATEGORY_BY_ID_SUCCESS,
  GET_SUBCATEGORY_BY_ID_REQUEST,
  GET_SUBCATEGORY_BY_ID_FAILURE,
  CREATE_PRODUCT_CATEGORY_REQUEST,
  GET_PRODUCT_CATEGORY_REQUEST,
  GET_PRODUCT_CATEGORY_SUCCESS,
  GET_PRODUCT_CATEGORY_FAILURE,
  GET_PRODUCT_CATEGORY_BY_ID_REQUEST,
  GET_PRODUCT_CATEGORY_BY_ID_SUCCESS,
  GET_PRODUCT_CATEGORY_BY_ID_FAILURE,
  CREATE_PRODUCT_CATEGORY_SUCCESS,
  CREATE_PRODUCT_CATEGORY_FAILURE,
  UPDATE_PRODUCT_CATEGORY_REQUEST,
  UPDATE_PRODUCT_CATEGORY_SUCCESS,
  UPDATE_PRODUCT_CATEGORY_FAILURE,
  REMOVE_PROUDUCT_CATEGORY_REQUEST,
  REMOVE_PROUDUCT_CATEGORY_SUCCESS,
  REMOVE_PROUDUCT_CATEGORY_FAILURE,
  GET_CATEGORY_REQUEST,
  GET_SUBCATEGORY_REQUEST,
} from "./ActionTypes";
import api, { API_BASE_URL } from "../../config/api";
import { toast } from "react-toastify";
import {
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
} from "../Customers/Order/ActionType";
import { Category_level } from "../../utils/utils";

// Register action creators

//  get user from token
export const getCategory = (payload) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });
    ;
    const { data } = await api.get(
      `${API_BASE_URL}/api/category/getAllCategory?level=${payload?.level}&pageNumber=${payload?.pageNumber}&pageSize=${payload?.pageSize}&searchTerm=${payload?.searchTerm}`
    );
    const categoryList=data?.category.Categorylist.map((listData) => {
      return { ...listData, label: listData?.name, value: listData?._id };
    })
    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: {categoryList,categoryCount:data?.category?.CategorysCount},
    });
    // return data?.category.Categorylist.map((listData) => {
    //   return { ...listData, label: listData?.name, value: listData?._id };
    // })
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/category/createCategory`,
      category
    );

    toast(data?.category?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
    if (data?.category?.createdCategory) {
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: data?.category?.createdCategory,
      });
    }

    console.log("created product ", data);
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/category/updateCategory`,
      category
    );
    console.log("UPDATE-data=>>>>", data);
    toast(data?.category?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
    if (data?.category?.success) {
      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
        payload: category,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const removeCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CATEGORY_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/category/deleteCategory`,
      category
    );
    console.log("UPDATE-data=>>>>", data);
    toast(data?.category?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
    if (data?.category?.success) {
      dispatch({
        type: REMOVE_CATEGORY_SUCCESS,
        payload: category,
      });
    }
  } catch (error) {
    dispatch({
      type: REMOVE_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getSubCategory = (payload) => async (dispatch) => {

  try {
    dispatch({ type: GET_SUBCATEGORY_REQUEST });

    const { data } = await api.get(
      `${API_BASE_URL}/api/category/getAllCategory?level=${payload?.level}&pageNumber=${payload?.pageNumber}&pageSize=${payload?.pageSize}&searchTerm=${payload?.searchTerm}`
    );
   const subCategoryList=data?.category.Categorylist.map((listData) => {
    return { ...listData, label: listData?.name, value: listData?._id };
  })
    dispatch({
      type: GET_SUBCATEGORY_SUCCESS,
      payload: {subCategoryList,subCatCount:data?.category?.CategorysCount},
    });
  } catch (error) {
    dispatch({
      type: GET_SUBCATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createSubCategory = (subcategory) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SUBCATEGORY_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/category/createCategory`,
      subcategory
    );

    toast(data?.category?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
    if (data?.category?.createdCategory) {
      dispatch({
        type: CREATE_SUBCATEGORY_SUCCESS,
        payload: data?.category?.createdCategory,
      });
    }

    console.log("created product ", data);
  } catch (error) {
    dispatch({
      type: CREATE_SUBCATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateSubCategory = (subcategory) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SUBCATEGORY_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/category/updateCategory`,
      subcategory
    );
    console.log("UPDATE-data=>>>>", data);
    toast(data?.category?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
    if (data?.category?.success) {
      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
        payload: subcategory,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const removeSubCategory = (subcategory) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_SUBCATEGORY_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/category/deleteCategory`,
      subcategory
    );
    console.log("UPDATE-data=>>>>", data);
    toast(data?.category?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
    if (data?.category?.success) {
      dispatch({
        type: REMOVE_SUBCATEGORY_SUCCESS,
        payload: subcategory,
      });
    }
  } catch (error) {
    dispatch({
      type: REMOVE_SUBCATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getProductCategory = (payload) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_CATEGORY_REQUEST });

    const { data } = await api.get(
      `${API_BASE_URL}/api/category/getAllCategory?level=${payload?.level}&pageNumber=${payload?.pageNumber}&pageSize=${payload?.pageSize}`
    );

    dispatch({
      type: GET_PRODUCT_CATEGORY_SUCCESS,
      payload: data?.category.Categorylist.map((listData) => {
        return { ...listData, label: listData?.name, value: listData?._id };
      }),
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProductCategory = (productCat) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_CATEGORY_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/category/createCategory`,
      productCat
    );

    toast(data?.category?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
    if (data?.category?.createdCategory) {
      dispatch({
        type: CREATE_PRODUCT_CATEGORY_SUCCESS,
        payload: data?.category?.createdCategory,
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateProductCategory = (productCat) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_CATEGORY_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/category/updateCategory`,
      productCat
    );
    console.log("UPDATE-data=>>>>", data);
    toast(data?.category?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
    if (data?.category?.success) {
      dispatch({
        type: UPDATE_PRODUCT_CATEGORY_SUCCESS,
        payload: productCat,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const removeProductCategory = (productCat) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_PROUDUCT_CATEGORY_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/category/deleteCategory`,
      productCat
    );
    console.log("UPDATE-data=>>>>", data);
    toast(data?.category?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
      theme: "light",
    });
    if (data?.category?.success) {
      dispatch({
        type: REMOVE_PROUDUCT_CATEGORY_SUCCESS,
        payload: productCat,
      });
    }
  } catch (error) {
    dispatch({
      type: REMOVE_PROUDUCT_CATEGORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCategoryById = (payload) => async (dispatch) => {

  try {
    if (payload?.level === Category_level?.SECONDARY) {
      dispatch({ type: GET_SUBCATEGORY_BY_ID_REQUEST });
      const { data } = await api.get(
        `${API_BASE_URL}/api/category/getAllCategory?parentCategory=${payload?.parentCatId}`
      );
      dispatch({
        type: GET_SUBCATEGORY_BY_ID_SUCCESS,
        payload: data?.category.Categorylist.map((listData) => {
          return { ...listData, label: listData?.name, value: listData?._id };
        }),
      });
      return data?.category.Categorylist.map((listData) => {
        return { ...listData, label: listData?.name, value: listData?._id };
      })
    }

    if (payload?.level === Category_level?.THIRD) {
      dispatch({ type: GET_PRODUCT_CATEGORY_BY_ID_REQUEST });
      const { data } = await api.get(
        `${API_BASE_URL}/api/category/getAllCategory?_id=${payload?.parentCatId}`
      );
      dispatch({
        type: GET_PRODUCT_CATEGORY_BY_ID_SUCCESS,
        payload: data?.category.Categorylist.map((listData) => {
          return { ...listData, label: listData?.name, value: listData?._id };
        }),
      });
    }
  } catch (error) {
    if (payload?.level === Category_level?.SECONDARY) {
      dispatch({
        type: GET_SUBCATEGORY_BY_ID_FAILURE,
        payload:
          error?.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }

    if (payload?.level === Category_level?.THIRD) {
      dispatch({
        type: GET_PRODUCT_CATEGORY_BY_ID_FAILURE,
        payload:
          error?.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
};
export const dummyApi = (payload) => (dispatch) => {
  console.log(payload);
};
