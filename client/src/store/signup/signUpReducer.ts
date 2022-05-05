import { AnyAction } from "@reduxjs/toolkit";
import { initialState } from "../rootReducer";
import { SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESSFULL } from "./actionConsts";

export function signUpReducer(state = initialState.user, action: AnyAction) {
    switch (action.type) {
        case SIGNUP_SUCCESSFULL:
            return action.payload;
        case SIGNUP_FAILURE:
            return null;
        default:
            return state;
    }
}