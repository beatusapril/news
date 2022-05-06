import { stringify } from "querystring";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../selectors/selectors";
import { tagsFetchAction, tagsSaveAction, tagsUpdateAction } from "../../store/tags/TagsAction";
import { Store } from "../../store/Types";
import { Header } from "../header/Header";
import { TagRow } from "./tagsrow/TagRow";

export function Tags() {
    const tags = useSelector<Store, string[]>(state => getTags(state));
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(tagsFetchAction());
    }, []);

    function onUpdateTag(name: string, newName: string) {
        const newTags = [...tags.filter(tag => tag !== name)]
        newTags.push(newName);
        dispatch(tagsUpdateAction(newTags));
    }

    function onCancel(){
        dispatch(tagsFetchAction());
    }

    function onSave(){
        dispatch(tagsSaveAction(tags));
    }


    return <div>
        <Header />
        {tags.map(tag => <TagRow key={tag} name={tag} onUpdate={onUpdateTag}></TagRow>)}
        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
    </div>
}