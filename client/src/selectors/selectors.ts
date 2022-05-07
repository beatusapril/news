import { Store } from "../store/Types";
import { NewInfo } from "../types/News";
import { UserInfo } from "../types/User";


export const getUser = (state: Store): UserInfo | null => state.user;
export const getUsers = (state: Store): UserInfo[] => state.users;
export const getTags = (state: Store): string[] => state.tags;
export const getNews = (state: Store): NewInfo[] => { console.log(state); return state.news.list};
export const getTotalCountNews = (state: Store): number => state.news.total;