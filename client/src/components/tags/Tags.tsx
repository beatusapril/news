import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../selectors/selectors";
import { tagsFetchAction, tagsSaveAction, tagsUpdateAction } from "../../store/tags/TagsAction";
import { Store } from "../../store/Types";
import { Header } from "../header/Header";
import { TagRow } from "./tagsrow/TagRow";
import '../tags/Tags.css'

export function Tags() {
    const tags = useSelector<Store, string[]>(state => getTags(state));
    const [newTag, setNewTag] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tagsFetchAction());
    }, []);

    function onUpdateTag(name: string, newName: string) {
        const newTags = [...tags.filter(tag => tag !== name)];
        newTags.push(newName);
        dispatch(tagsUpdateAction(newTags));
    }

    function onCancel() {
        dispatch(tagsFetchAction());
        setNewTag('');
    }

    function onSave() {
        dispatch(tagsSaveAction(tags));
    }

    function onDelete(name: string) {
        const newTags = [...tags.filter(tag => tag !== name)];
        dispatch(tagsUpdateAction(newTags));
    }

    function onChangeTag(ev: any){
        setNewTag(ev.target.value);
    }

    function addTag(){
        if (newTag){
            const tagsFiltered = tags.filter(tag=> tag === newTag)
            if (tagsFiltered.length > 0){
                return;
            }
            tags.push(newTag)
            dispatch(tagsUpdateAction([...tags]));
            setNewTag('');
        }

    }


    return <div>
        <Header />
        <div className="wrapper">
            {tags.map(tag => <TagRow key={tag} name={tag} onUpdate={onUpdateTag} onDelete={onDelete}></TagRow>)}
            <div className="tags__input">
                <input value={newTag} onChange={onChangeTag}></input>
                <button type="button" onClick={addTag} className="btn">Add tag</button>
            </div>
            <div className="tags__button-panel">
                <button className="tags__save btn" onClick={onSave}>Save</button>
                <button className="btn" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    </div>
}