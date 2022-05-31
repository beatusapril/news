import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN, READER } from "../../../consts/consts";
import { getUser } from "../../../selectors/selectors";
import { Store } from "../../../store/Types";
import { UserInfo } from "../../../types/User";
import { NewCardProps } from "./NewCardTypes";
import '../newCard/NewCard.css'
import { newsDelete, newsMarkAsReadAction } from "../../../store/news/newsAction";
import { NewsCardUpdateDialog } from "./newsCardUpdateDialog/NewsCardUpdate";

export function NewCard(props: NewCardProps) {
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector<Store, UserInfo | null>(state => getUser(state));
    const dispatch = useDispatch();

    function onEdit() {
        setIsEdit(true);
        setIsOpen(true);
    }

    function resetUpdate() {
        setIsEdit(false)
        props.reload()
    }

    function handleClose() {
        setIsOpen(false);
    }

    function markAsRead() {
        dispatch(newsMarkAsReadAction({ ids: [props.card.id] }))
        props.reload()
    }

    function onDelete() {
        if (window.confirm("Do you really want to delete news?")) {
            dispatch(newsDelete(props.card.id));
            props.reload();
        }
    }


    return <div className={"news-card" + (props.card.isRead ? " news-read" : "")}>
        <NewsCardUpdateDialog news={props.card} open={isOpen} handleClose={handleClose} />
        {<div>
            <div className="news-card-author-name">{props.card.publicationDate + ' ' + props.card.authorFirstName + ' ' + props.card.authorLastName + ' ' + props.card.authorNickname}</div>
            <h6>{props.card.header}</h6>
            <textarea readOnly={true} name="" id="" rows={5} className="news-card__description" value={props.card.description}></textarea>
            <div>{props.card.tags.map(tag => <div className="tag-view">{tag}</div>)}</div>
            <div className="btn-panel">
                {user?.role != READER && user?.id === props.card.author &&
                    <button className="btn-custom-no-active news-card__edit-btn" onClick={onEdit}>Edit</button>}
                {!props.draft && <button className="btn-pink btn-mark-as-read" onClick={markAsRead}>Mark as read</button>}
                {(user?.role === ADMIN) && <button className="btn-custom news-card__btn-delete" onClick={onDelete}>Delete</button>}
            </div>
        </div>}
    </div>
}