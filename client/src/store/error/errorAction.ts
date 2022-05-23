import { AnyAction } from "@reduxjs/toolkit";
import { CLEAR_ERROR, SET_ERROR } from "./errorConst";

export function setErrorAction(error: string): AnyAction{
    return {type: SET_ERROR, payload: error}
}

export function clearErrorAction(): AnyAction{
    return {type: CLEAR_ERROR}
}