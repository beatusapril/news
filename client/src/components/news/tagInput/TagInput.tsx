import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../../selectors/selectors";
import { tagsFetchAction } from "../../../store/tags/TagsAction";
import { Store } from "../../../store/Types";
import { TagRowFilter } from "../filter/Filter"
import { TagInputProps } from "./TagInputTypes"

export function TagInput(props: TagInputProps){

    const tags = useSelector<Store, string[]>(state => getTags(state));
    const [newTag, setNewTag] = useState('');
    const dispatch = useDispatch();

    const onChangeTag = (ev: any) => {
        if (ev.target.value) {
            setNewTag(ev.target.value);
        }
    }

    useEffect(() => {
        dispatch(tagsFetchAction());
    }, []);

    function addTag(){
        props.addTag(newTag);
    }
    return   <div>
    <ul>
        {props.tags?.map(tag => <li><TagRowFilter name={tag} onDelete={props.onDelete} /> </li>)}
    </ul>
    <div>
        <select onChange={onChangeTag}>
            <option>{''}</option>
            {tags.map(tag => <option>{tag}</option>)}
        </select>
        <button type="button" onClick={addTag}>Add tag</button>
    </div>
</div>
}
