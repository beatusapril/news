import { AnyAction } from "@reduxjs/toolkit";
import { initialState } from "../rootReducer";
import { TAGS_FETCH_FAILURE, TAGS_FETCH_SUCCESSFULL, TAGS_SAVE, TAGS_SAVE_FAILURE, TAGS_SAVE_SUCCESSFULL, TAGS_UPDATE } from "./TagActionConsts";

export function tagsReducer(state = initialState.tags, action: AnyAction) {
    switch (action.type) {
        case TAGS_UPDATE:
            return action.payload;
        case TAGS_SAVE:
            return action.payload;
        case TAGS_SAVE_FAILURE:
            return action.payload;
        case TAGS_SAVE_SUCCESSFULL:
            return action.payload;
        case TAGS_FETCH_SUCCESSFULL:
            return action.payload;
        case TAGS_FETCH_FAILURE:
            return [];
        default:
            return state;
    }
}