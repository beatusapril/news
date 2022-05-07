import { NewsRequest } from "../../../types/News";

export interface TagRowFilterProps{
    name: string;
    onDelete: (name: string) => void
}

export interface FilterProps{
    onSubmit: (filter: NewsRequest) => void
    onReset: (filter: NewsRequest) => void
}