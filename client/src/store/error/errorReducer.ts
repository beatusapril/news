import { AnyAction } from "@reduxjs/toolkit";
import { initialState } from "../rootReducer";
import { CLEAR_ERROR, SET_ERROR } from "./errorConst";


export function errorReducer(state = initialState.error, action: AnyAction) {
    switch (action.type) {
        case SET_ERROR:
            return action.payload;
        case CLEAR_ERROR:
            return '';
        default:
            return state;
    }
}