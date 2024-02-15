import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from "redux-thunk";
import authReducer from "./Auth/Reducer";
import customerProductReducer from "./Customers/Product/Reducer";
import productReducer from "./Admin/Product/Reducer";
import cartReducer from "./Customers/Cart/Reducer";
import { orderReducer } from "./Customers/Order/Reducer";
import adminOrderReducer from "./Admin/Orders/Reducer";
import ReviewReducer from "./Customers/Review/Reducer";
import adminCategoryReducer from "./Category/Reducer";
import adminBannerReducer from "./Admin/Banner/Reducer";
import userDashboardReducer from "./Dashboard/Reducer";
import adminCustomerReducer from "./Customers/Users/Reducer";
import adminDashboardReducer from "./Admin/Dashboard/Reducer";




const rootReducers=combineReducers({

    auth:authReducer,
    customersProduct:customerProductReducer,
    cart:cartReducer,
    order:orderReducer,
    review:ReviewReducer,
    userDasboard:userDashboardReducer,

    // admin
    adminsProduct:productReducer,
    adminsOrder:adminOrderReducer,
    adminCategory:adminCategoryReducer,
    adminBanner:adminBannerReducer,
    customers:adminCustomerReducer,
    adminDashboard:adminDashboardReducer
});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))