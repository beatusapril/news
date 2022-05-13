import { useState } from "react";
import { TagProps } from "./TagRowTypes";
import "../tagsrow/TagRow.css"

export function TagRow(props: TagProps) {
    const [isEdit, setIsEdit] = useState(false);

    function onClick() {
        setIsEdit(true);
    }

    function onUpdateTag(ev: any) {
        props.onUpdate(props.name, ev.target.value);
    }

    function onDelete() {
        props.onDelete(props.name);
    }

    return <div className="tags_tag-row">{isEdit && <input className="tags__input" value={props.name} onChange={ev => onUpdateTag(ev)} />}
        {!isEdit && <span className="tags__tag-name"onClick={onClick}>{props.name}
        </span>}<button className="btn" onClick={onDelete}>Delete</button></div>
}