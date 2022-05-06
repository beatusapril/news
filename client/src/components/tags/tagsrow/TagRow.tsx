import { useState } from "react";
import { TagProps } from "./TagRowTypes";

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

    return <div>{isEdit && <input value={props.name} onChange={ev => onUpdateTag(ev)} />}
        {!isEdit && <span onClick={onClick}>{props.name}
        </span>}<button onClick={onDelete}>Delete</button></div>
}