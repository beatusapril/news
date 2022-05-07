export interface NewInfo{
    header: string,
    description: string,
    tags: string[],
    authorNickname: string,
    authorFirstName: string,
    authorLastName: string
}

export interface NewsWrapper{
    news: NewsResponse;
}

export interface NewsResponse{
    list: NewInfo[],
    offset: number;
    limit: number;
    total: number;
}

export interface NewsRequest{
    tags: string[] | null,
    onlyNew: boolean | null,
    author: string | null,
    header: string | null,
    offset: number,
    limit: number
}