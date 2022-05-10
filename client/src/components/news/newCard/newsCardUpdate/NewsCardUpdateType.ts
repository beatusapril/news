import { NewsInfo } from "../../../../types/News";

export interface NewsCardUpdateProps{
    news: NewsInfo
    resetUpdate: () => void 
}