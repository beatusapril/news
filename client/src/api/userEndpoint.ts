import { Role, UserRequest } from "../types/User";
import { serverUrl } from "./server";

export const loginUrl = `${serverUrl}/auth/login`
export const getUserMe = `${serverUrl}/user/me`
export const logoutUrl = `${serverUrl}/auth/logout`
export const signUpUrl = `${serverUrl}/auth/signup`
export const getUsers = `${serverUrl}/admin/users`
export const editRoleApi = (id: number) => `${serverUrl}/admin/user/${id}`


export async function getLogin(user: UserRequest) {
    const result = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(user)
    })
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });
  
    return result;
}


export async function getUser(token: string) {
    const result = await fetch(getUserMe, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'token': token
      }
    })
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });
  
    return result;
}

export async function signupApi(user: UserRequest) {
    const result = await fetch(signUpUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(user)
    })
      .then((response) => response.text())
      .catch((error) => {
        throw error;
      });
  
    return result;
}

export async function getUsersApi(token: string) {
    const result = await fetch(getUsers, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'token': token
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });  
    return result;
}

export async function editRoleApiCall(token: string, role:Role, id: number) {
    const result = await fetch(editRoleApi(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'token': token
      },
      body: JSON.stringify({
          role: role
      })
    })
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });  
    return result;
}