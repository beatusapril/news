import { useState } from "react";
import { useSelector } from "react-redux";
import { READER } from "../../../consts/consts";
import { getUser } from "../../../selectors/selectors";
import { Store } from "../../../store/Types";
import { UserInfo } from "../../../types/User";
import { NewCardProps } from "./NewCardTypes";
import { NewsCardUpdate } from "./newsCardUpdate/NewsCardUpdate";
import '../newCard/NewCard.css'

export function NewCard(props: NewCardProps) {
    const [isEdit, setIsEdit] = useState(false);
    const user = useSelector<Store, UserInfo | null>(state => getUser(state));

    function onEdit() {
        setIsEdit(true);
    }

    function resetUpdate() {
        setIsEdit(false)
    }
    return <div className="news-card">
        {isEdit && <NewsCardUpdate news={props.card} resetUpdate={resetUpdate} />}
        {!isEdit && <div>
            <div className="news-card-author-name">{props.card.publicationDate + ' ' + props.card.authorFirstName + ' ' + props.card.authorLastName + ' ' + props.card.authorNickname}</div>
            <h6>{props.card.header}</h6>
            <textarea readOnly={true} name="" id="" rows={5} className="news-card__description">{props.card.description}</textarea>
            <div>{props.card.tags.map(tag => <div className="tag-view">{tag}</div>)}</div>
            <div className="btn-panel">{user?.role != READER && user?.id === props.card.author &&
             <button className="btn-custom-no-active news-card__edit-btn" onClick={onEdit}>Edit</button>}</div></div>}
    </div>
}