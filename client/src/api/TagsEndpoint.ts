import { serverUrl } from "./server";

export const getTags = `${serverUrl}/news/tags`
export const getSaveTags = `${serverUrl}/admin/news/tags`

export async function getTagsApi(token: string) {
    const result = await fetch(getTags, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'token': token
        },
    })
        .then(response => response.json())
        .catch((error) => {
            throw error;
        });
    return result;
}

export async function saveTagsApi(token: string, tags: string[]) {
    const result = await fetch(getSaveTags, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'token': token
        },
        body: JSON.stringify(tags)
    })
    .catch((response) => response.text())
        .catch((error) => {
            throw error;
        });
    return result;
}