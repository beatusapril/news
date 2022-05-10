import { useState } from "react";
import { useSelector } from "react-redux";
import { READER } from "../../../consts/consts";
import { getUser } from "../../../selectors/selectors";
import { Store } from "../../../store/Types";
import { UserInfo } from "../../../types/User";
import { NewCardProps } from "./NewCardTypes";
import { NewsCardUpdate } from "./newsCardUpdate/NewsCardUpdate";

export function NewCard(props: NewCardProps){
    const [card, setCard] = useState(props.card);
    const [isEdit, setIsEdit] = useState(false);
    const user = useSelector<Store, UserInfo | null>(state => getUser(state));

    function onEdit(){
        setIsEdit(true);
    }

    function resetUpdate(){
        setIsEdit(false)
    }
    return <div>
        {isEdit && <NewsCardUpdate news={props.card} resetUpdate={resetUpdate}/>}
        {!isEdit && <div>
        {props.card.header}
        {props.card.authorFirstName}
        {props.card.authorLastName}
        {props.card.authorNickname}
        {props.card.description}
        {props.card.tags}{ user?.role != READER && user?.id === props.card.author && <button onClick={onEdit}>Edit</button> }</div>}
    </div>
}