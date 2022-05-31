import { NewsInfo } from "../../../../types/News";

export interface NewsCardDialogUpdateProps{
    news: NewsInfo
    open: boolean,
    handleClose: () => void
}