import { useState } from "react";
import { NewCardProps } from "./NewCardTypes";

export function NewCard(props: NewCardProps){
    const [card, setCard] = useState(props.card)
    return <div>
        {props.card.header}
        {props.card.authorFirstName}
        {props.card.authorLastName}
        {props.card.authorNickname}
        {props.card.description}
        {props.card.tags}
    </div>
}