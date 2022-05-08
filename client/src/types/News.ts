export enum NewState{
    draft = 'draft', published='published'
}

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

export interface NewsCreateRequest{
    header: string,
    description: string,
    tags: string[]
    state: NewState
    publicationDate: string

}