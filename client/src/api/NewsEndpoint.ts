import { NewsRequest } from "../types/News";
import { serverUrl } from "./server";

const getNewsUrl = (req: NewsRequest) => {
    let queryParams: string[] = []
    if (req.tags) {
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