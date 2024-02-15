import { GET_USER_LIST_FAILURE, GET_USER_LIST_REQUEST, GET_USER_LIST_SUCCESS } from "./Action Type";


const initialState = {
    loading: false,
    error: null,
    userList: [],
    userCount:10
  };
  const adminCustomerReducer=(state=initialState,action)=>{
    switch(action?.type){
        case GET_USER_LIST_REQUEST:
            return {...state,loading:true,error:null};
        case GET_USER_LIST_SUCCESS:
            return {...state,userList:[...action?.payload?.list],userCount:action?.payload?.userCount,loading:false,error:null};
        case GET_USER_LIST_FAILURE:
            return {...state,userList:[],error:action?.payload,loading:false};
         default:
            return state;   
    }
  }
  export default adminCustomerReducer