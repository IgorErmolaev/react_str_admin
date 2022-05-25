import {configureStore} from "@reduxjs/toolkit";
import strCodesReducer from './strCodesSlice';
import authReducer from './authSlice';

export default configureStore ({
    reducer:{
        strCodesState:strCodesReducer,
        authState:authReducer
    }
})