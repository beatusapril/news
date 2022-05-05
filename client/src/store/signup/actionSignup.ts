import { AnyAction } from "@reduxjs/toolkit"
import { UserInfo, UserRequest } from "../../types/User"
import { SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESSFULL } from "./actionConsts"

export function signUp(user: UserRequest): AnyAction {
    return { type: SIGNUP, payload: user };
}

export function signUpSuccessfull(user: UserInfo): AnyAction {
    return { type: SIGNUP_SUCCESSFULL, payload: user };
}

export function signUpFailure(): AnyAction {
    return { type: SIGNUP_FAILURE };
}