import { NewsCreateRequest, NewsRequest, NewsUpdateRequest } from "../types/News";
import { serverUrl } from "./server";

const getNewsUrl = (req: NewsRequest) => {
    let queryParams: string[] = []
    if (req.tags && req.tags.length !== 0) {
        queryParams.push(`tags=${req.tags}`);
    }
    if (req.author) {
        queryParams.push(`author=${req.author}`);
    }
    if (req.header) {
        queryParams.push(`header=${req.header}`);
    }
    if (req.onlyNew) {
        queryParams.push(`onlyNew=${req.onlyNew}`);
    }
    if (req.limit) {
        queryParams.push(`limit=${req.limit}`);
    }
    if (req.offset !== null && req.offset !== undefined) {
        queryParams.push(`offset=${req.offset}`);
    }
    let url = `${serverUrl}/news/`
    for (let i = 0; i < queryParams.length; i++) {
        if (i == 0) {
            url += '?'
        }
        if (i > 0) {
            url += '&'
        }
        url += queryParams[i];
    }
    return url;
}
const newsCreateUrl = `${serverUrl}/news/`
const newsUpdateUrl = (id: number) => `${serverUrl}/news/${id}`

export async function getNewsApi(token: string, req: NewsRequest) {
    const result = await fetch(getNewsUrl(req), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'token': token
        }
    })
        .then((response) => response.json())
        .catch((error) => {
            throw error;
        });

    return result;
}

export async function createNewsApi(token: string, req: NewsCreateRequest) {
    //2022-05-07
    const objectFormat = {...req, publicationDate: new Date(req.publicationDate).toDateString()}
    const result = await fetch(newsCreateUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'token': token
        },
        body: JSON.stringify(objectFormat )
    })
        .then((response) => response.json())
        .catch((error) => {
            throw error;
        });

    return result;
}

export async function updateNewsApi(token: string, req: NewsUpdateRequest) {
    const result = await fetch(newsUpdateUrl(req.id), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'token': token
        },
        body: JSON.stringify(req)
    })
        .then((response) => response.json())
        .catch((error) => {
            throw error;
        });

    return result;
}