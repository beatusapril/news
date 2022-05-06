import { TAGS_FETCH, TAGS_FETCH_FAILURE, TAGS_FETCH_SUCCESSFULL, TAGS_SAVE, TAGS_SAVE_FAILURE, TAGS_SAVE_SUCCESSFULL, TAGS_UPDATE } from "./TagActionConsts";

export function tagsUpdateAction(tags: string[]) {
    return { type: TAGS_UPDATE, payload: tags }
}

export function tagsSaveAction(tags: string[]) {
    return { type: TAGS_SAVE, payload: tags }
}

export function tagsSaveSuccessfullAction(tags: string[]) {
    return { type: TAGS_SAVE_SUCCESSFULL, payload: tags }
}

export function tagsSaveFailureAction(tags: string[]) {
    return { type: TAGS_SAVE_FAILURE, payload: tags }
}

export function tagsFetchAction() {
    return { type: TAGS_FETCH }
}

export function tagsFetchSuccessfullAction(tags: string[]) {
    return { type: TAGS_FETCH_SUCCESSFULL, payload: tags }
}

export function tagsFetchFailureAction() {
    return { type: TAGS_FETCH_FAILURE }
}