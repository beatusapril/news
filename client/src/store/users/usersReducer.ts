import { AnyAction } from "@reduxjs/toolkit";
import { initialState } from "../rootReducer";
import { FETCH_USERS, FETCH_USERS_SUCCESSFULL } from "./usersActionConsts";


export function usersReducer(state = initialState.users, action: AnyAction) {
    switch (action.type) {
        case FETCH_USERS_SUCCESSFULL:
            return action.payload;
        default:
            return state;
    }
}