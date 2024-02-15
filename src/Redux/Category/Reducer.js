
import {
 
    GET_CATEGORY_FAILURE,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    CREATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_SUCCESS,
    REMOVE_CATEGORY_SUCCESS,
    CREATE_SUBCATEGORY_SUCCESS,
    UPDATE_SUBCATEGORY_SUCCESS,
    REMOVE_SUBCATEGORY_SUCCESS,
    GET_SUBCATEGORY_SUCCESS,
    GET_SUBCATEGORY_BY_ID_SUCCESS,
    GET_PRODUCT_CATEGORY_SUCCESS,
    UPDATE_PRODUCT_CATEGORY_SUCCESS,
    CREATE_PRODUCT_CATEGORY_SUCCESS,
    REMOVE_PROUDUCT_CATEGORY_SUCCESS,
    GET_PRODUCT_CATEGORY_BY_ID_SUCCESS,
    GET_SUBCATEGORY_BY_ID_REQUEST,
    CREATE_SUBCATEGORY_REQUEST,
    GET_SUBCATEGORY_REQUEST,

  } from "./ActionTypes";
  
  const initialState = {
    loading: false,
    category: [],
    subcategory:[],
    subCatCount:10,
    catCount:10,
    productcategory:[],
    error: "",
  };
  
  const adminCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          category: action.payload?.categoryList,
          catCount:action.payload?.categoryCount,
          error: "",
        };
      case GET_CATEGORY_FAILURE:
        return {
          ...state,
          loading: false,
          category: [],
          error: action.payload,
        };
      case CREATE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          category: [...state?.category,action?.payload],
          error: action.payload,
        };
      case UPDATE_CATEGORY_SUCCESS:
        let updated_category_list=state.category.map(cat=>{if(cat?._id===action?.payload?.id){
          return  {...cat,name:action?.payload?.name}
        }else return cat})
        return {
          ...state,
          loading: false,
          category: [...updated_category_list],
          error: {},
        };
     
      case REMOVE_CATEGORY_SUCCESS:
        let filterd_category_list=state.category.filter(cat=>cat?._id !== action?.payload?.id)
        return {
          ...state,
          loading: false,
          category: [...filterd_category_list],
          error: {},
        };
      case GET_SUBCATEGORY_REQUEST:
          
        return {
          ...state,
          loading: true,
          error: "",
        };
      case GET_SUBCATEGORY_SUCCESS:
          
        return {
          ...state,
          loading: false,
          subcategory: action.payload?.subCategoryList,
          subCatCount:action.payload?.subCatCount,
          error: "",
        };
      case CREATE_SUBCATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          subcategory: [...state?.subcategory,action?.payload],
          error: "",
        };
      case UPDATE_SUBCATEGORY_SUCCESS:
        let updated_subcategory_list=state.subcategorycategory.map(cat=>{if(cat?._id===action?.payload?.id){
          return  {...cat,name:action?.payload?.name}
        }
        else return cat
      })
        return {
          ...state,
          loading: false,
          subcategory: [...updated_subcategory_list],
          error: {},
        };
     
      case REMOVE_SUBCATEGORY_SUCCESS:
        let filterd_subcategory_list=state.subcategory.filter(cat=>cat?._id !== action?.payload?.id)
        return {
          ...state,
          loading: false,
          category: [...filterd_subcategory_list],
          error: {},
        };
      case  GET_SUBCATEGORY_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
          error: "",
        };
      case  GET_SUBCATEGORY_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          subcategory: action.payload,
          error: "",
        };
       
      case GET_PRODUCT_CATEGORY_SUCCESS:
          
        return {
          ...state,
          loading: false,
          productcategory: action.payload,
          error: "",
        };
      case CREATE_PRODUCT_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          productcategory: [...state?.productcategory,action?.payload],
          error: "",
        };
      case UPDATE_PRODUCT_CATEGORY_SUCCESS:
        let updated_product_category_list=state.productcategory.map(cat=>{if(cat?._id===action?.payload?.id){
          return  {...cat,name:action?.payload?.name}
        }
        else return cat
      })
      console.log({updated_product_category_list})
        return {
          ...state,
          loading: false,
          productcategory: updated_product_category_list,
          error: {},
        };
     
      case REMOVE_PROUDUCT_CATEGORY_SUCCESS:
        let filterd_product_category_list=state.productcategory.filter(cat=>cat?._id !== action?.payload?.id)
        return {
          ...state,
          loading: false,
          productcategory: [...filterd_product_category_list],
          error: {},
        };
      case GET_PRODUCT_CATEGORY_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          productcategory: action.payload,
          error: "",
        };
   
      default:
        return state;
    }
  };
  
  export default adminCategoryReducer;
  