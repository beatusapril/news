export enum NewState{
    draft = 'draft', published='published'
}

export interface NewsInfo{
    id: number,
    header: string,
    description: string,
    tags: string[],
    authorNickname: string,
    authorFirstName: string,
    authorLastName: string,
    publicationDate: string,
    author: number,
    isRead: boolean,
    state: NewState
}

export interface NewsWrapper{
    news: NewsResponse;
}

export interface NewsResponse{
    list: NewsInfo[],
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

export interface NewsUpdateRequest{
    id: number,
    header: string,
    description: string,
    tags: string[]
    state: NewState
    publicationDate: string
}

export interface ReadNews{
    ids: number[]
}