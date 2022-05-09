import { AnyAction } from "@reduxjs/toolkit";
import { initialState } from "../rootReducer";
import { SIGNUP_FAILURE, SIGNUP_SUCCESSFULL } from "../signup/actionConsts";
import { FETCH_ME_SUCCESSFULL } from "../users/usersActionConsts";
import { FETCH_ME_FAILURE, LOGIN_FAILURE, LOGIN_SUCCESSFULL, LOGOUT, LOGOUT_FAILURE, LOGOUT_SUCCESSFULL, ME_UPDATE_SUCCESSFULL } from "./actionConsts";

export function loginReducer(state = initialState.user, action: AnyAction) {
    switch (action.type) {
        case LOGIN_SUCCESSFULL:
            return action.payload;
        case LOGIN_FAILURE:
            return null;
        case LOGOUT_SUCCESSFULL:
            return null;
        case LOGOUT_FAILURE:
            return state;
        case SIGNUP_SUCCESSFULL:
            return action.payload;
        case SIGNUP_FAILURE:
            return null;
        case FETCH_ME_SUCCESSFULL:
            return action.payload;
        case FETCH_ME_FAILURE:
            return null;
        case ME_UPDATE_SUCCESSFULL:
            return {...state, tags: action.payload.tags,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                phone: action.payload.phone,
                showFirstName: action.payload.showFirstName,
                showLastName: action.payload.showLastName,
                showPhone: action.payload.showPhone}
        default:
            return state;
    }
}