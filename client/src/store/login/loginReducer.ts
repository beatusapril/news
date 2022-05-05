import { AnyAction } from "@reduxjs/toolkit";
import { initialState } from "../rootReducer";
import { LOGIN_FAILURE, LOGIN_SUCCESSFULL, LOGOUT } from "./actionConsts";

export function loginReducer(state = initialState.user, action: AnyAction){
    switch (action.type){
        case LOGIN_SUCCESSFULL:
            return {login: action.payload.login};
        case LOGIN_FAILURE:
            return null;
        case LOGOUT:
            return null;
        default:
            return state;
    }
}