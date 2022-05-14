import { useState } from "react";
import { useDispatch } from "react-redux";
import { editRoleAction } from "../../../store/users/usersAction";
import { Role } from "../../../types/User";
import { fromNumberRole } from "../../../utils/Utils";
import { UserRowProps } from "./UserRowTypes";
import "../row/UserRow.css"

export function UserRow(props: UserRowProps) {
    const [role, setRole] = useState<Role | null>(fromNumberRole(props.user.role));
    const dispatch = useDispatch()

    function onChange(event: any) {
        const selectRole = event?.target.value;
        setRole(selectRole);
    }

    function saveRole() {
        dispatch(editRoleAction(props.user.id, role))
    }

    return <div className="user-component">
        <div>
            <div>
                <label htmlFor="name">Name:</label>
                <span id="name">{props.user.firstName}</span>
            </div>
            <div>
                <select value={role?.toString()} onChange={ev => onChange(ev)}>
                    <option>{Role.admin}</option>
                    <option>{Role.writer}</option>
                    <option>{Role.reader}</option>
                </select>
            </div>
        </div>
        <div>
            <div>
                <label htmlFor="lastname">Last name:</label>
                <span id="lastname">{props.user.lastName}</span>
            </div>
            <div>
                <label htmlFor="phone">Phone: </label>
                <span id="phone">{props.user.phone}</span>
            </div>
        </div>
        <div>
            <div>
                <label htmlFor="login">Login:</label>
                <span id="login">{props.user.login}</span>
            </div>
            <div className="tag-container">
                {props.user.tags.map(tag=> <div className="tag-wrapper tag_offset">{tag}</div>)}
            </div>
        </div>
        <button className="save-role-button btn" onClick={saveRole}>Save role</button>
    </div >
}