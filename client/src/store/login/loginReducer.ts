import { AnyAction } from "@reduxjs/toolkit";
import { initialState } from "../rootReducer";
import { LOGIN_FAILURE, LOGIN_SUCCESSFULL, LOGOUT, LOGOUT_FAILURE, LOGOUT_SUCCESSFULL } from "./actionConsts";

export function loginReducer(state = initialState.user, action: AnyAction){
    switch (action.type){
        case LOGIN_SUCCESSFULL:
            return action.payload;
        case LOGIN_FAILURE:
            return null;
        case LOGOUT_SUCCESSFULL:
            return null;
        case LOGOUT_FAILURE:
            return state;
        default:
            return state;
    }
}