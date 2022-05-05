import { AnyAction } from "@reduxjs/toolkit";
import { User, UserRequest } from "../../types/User";
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESSFULL, LOGOUT } from "./actionConsts";

export function login(user: UserRequest): AnyAction {
    return { type: LOGIN, payload: user }
}

export function loginSuccessfull(user: User): AnyAction {
    return { type: LOGIN_SUCCESSFULL, payload: user }
}

export function loginFailure(): AnyAction {
    return { type: LOGIN_FAILURE }
}

export function logout(): AnyAction {
    return { type: LOGOUT }
}