import { NewsInfo } from "../../../types/News";

export interface NewCardProps{
    card: NewsInfo,
    reload: () => void ,
    draft: boolean
}