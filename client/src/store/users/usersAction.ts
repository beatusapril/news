import { AnyAction } from "@reduxjs/toolkit";
import { Role, UserInfo } from "../../types/User";
import { EDIT_ROLE, FETCH_USERS, FETCH_USERS_FAILURE, FETCH_USERS_SUCCESSFULL } from "./usersActionConsts";

export function fetchUsersAction(): AnyAction{
    return {type: FETCH_USERS}
}

export function fetchUsersSuccesfull(users: UserInfo[]): AnyAction{
    return {type: FETCH_USERS_SUCCESSFULL, payload: users}
}

export function fetchUsersFailure(): AnyAction{
    return {type: FETCH_USERS_FAILURE, payload: []}
}

export function editRoleAction(id: number, role: Role | null){
    return {type: EDIT_ROLE, payload: {id: id, role: role}}
}