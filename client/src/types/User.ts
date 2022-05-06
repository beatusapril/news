export enum Role {
    writer = "writer",
    reader = "reader",
    admin = "admin"
}

/* export interface User {
    firstName: string,
    lastName: string,
    phone: string,
    tags: string[],
    showFirstName: boolean,
    showLastName: boolean,
    showPhone: boolean
    role: Role,
    login: string
} */

export interface UserRequest{
    login: string | null,
    password: string | null,

}

export interface LoginResponse{
    token: string
}

export interface UserInfo{
    id: number,
    tags: string[];
    firstName: string,
    lastName: string,
    phone: string,
    showFirstName: true,
    showLastName: true,
    showPhone: true,
    role: number,
    login: string
}

export interface UserResponse{
    me: UserInfo
}

