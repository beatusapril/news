import { NewsResponse } from "../types/News";
import { UserInfo } from "../types/User";

export interface Store {
    user: UserInfo | null;
    users: UserInfo[]
    tags: string[],
    news: NewsResponse
    subscribeNews: NewsResponse
}