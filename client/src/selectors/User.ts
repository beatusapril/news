import { Store } from "../store/Types";
import { UserInfo } from "../types/User";


export const getUser = (state: Store): UserInfo | null => state.user;
export const getUsers = (state: Store): UserInfo[] => state.users;