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
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
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
  GET_LOGO_SUCCESS,
  GET_LOGO_FAILURE,
  CREATE_LWT_REQUEST,
  CREATE_LWT_SUCCESS,
  CREATE_LWT_FAILURE,
} from "./ActionTypes";

const initialState = {
  user: null,
  isLoading: false,
  site:{logo:"",title:""},
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case REGISTER_SUCCESS:
      return { ...state, isLoading: false };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false };
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload };
    case GET_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case UPDATE_USER_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, isLoading: false, user: action?.payload };
    case UPDATE_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case ADD_ADDRESS_REQUEST:
      return { ...state, isLoading: true };
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          addresses: [...state?.user?.addresses, action?.payload],
        },
        isLoading: false,
      };
    case ADD_ADDRESS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case UPDATE_ADDRESS_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        user: {
          ...state?.user,
          addresses: state?.user?.addresses?.map((address) =>
            address?._id === action?.payload?._id ? action?.payload : address
          ),
         
        },
        isLoading: false,
      };
    case UPDATE_ADDRESS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case REMOVE_ADDRESS_REQUEST:
      return { ...state, isLoading: true };
    case REMOVE_ADDRESS_SUCCESS:
      return {
        ...state,
        user: {
          ...state?.user,
          addresses: state?.user?.addresses?.filter(
            (address) => address?._id !== action?.payload?.id
          ),
        },
        isLoading:false
      };
    case REMOVE_ADDRESS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOGOUT:
      localStorage.removeItem("jwt");
      return { ...state, jwt: null, user: null };
    case GET_LOGO_REQUEST:
      return { ...state, isLoading: true };
    case GET_LOGO_SUCCESS:
      return { ...state, isLoading: false, site:{...state.site,logo:action?.payload?.logo,title:action?.payload?.title} };
    case GET_LOGO_FAILURE:
      return {...state,isLoading:false,error: action.payload };
      case CREATE_LWT_REQUEST:
        return { ...state, isLoading: true };
    case CREATE_LWT_SUCCESS:
          return { ...state, isLoading: false, };
    case CREATE_LWT_FAILURE:
      return {...state,isLoading:false,error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
