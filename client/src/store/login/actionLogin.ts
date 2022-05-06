import { AnyAction } from "@reduxjs/toolkit";
import { UserInfo, UserRequest } from "../../types/User";
import { FETCH_ME, FETCH_ME_FAILURE, FETCH_ME_SUCCESSFULL, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESSFULL, LOGOUT, LOGOUT_FAILURE, LOGOUT_SUCCESSFULL } from "./actionConsts";

export function login(user: UserRequest): AnyAction {
    return { type: LOGIN, payload: user }
}

export function loginSuccessfull(user: UserInfo): AnyAction {
    return { type: LOGIN_SUCCESSFULL, payload: user }
}

export function loginFailure(): AnyAction {
    return { type: LOGIN_FAILURE }
}

export function logout(): AnyAction {
    return { type: LOGOUT }
}

export function logoutSuccesfull(): AnyAction{
    return {type: LOGOUT_SUCCESSFULL}
}

export function logoutFailure(): AnyAction{
    return {type: LOGOUT_FAILURE}
}

export function fetchMeAction(): AnyAction{
    return {type: FETCH_ME}
}

export function fetchMeSuccessfull(user: UserInfo): AnyAction{
    return {type: FETCH_ME_SUCCESSFULL, payload: user}
}

export function fetchMeFailure(): AnyAction{
    return {type: FETCH_ME_FAILURE, payload: null}
}