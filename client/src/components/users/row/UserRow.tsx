import { useState } from "react";
import { useDispatch } from "react-redux";
import { editRoleAction } from "../../../store/users/usersAction";
import { Role } from "../../../types/User";
import { fromNumberRole } from "../../../utils/Utils";
import { UserRowProps } from "./UserRowTypes";
import "../row/UserRow.css"

export function UserRow(props: UserRowProps) {
    const [role, setRole] = useState<Role | null>(fromNumberRole(props.user.role));
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    function onChange(event: any) {
        const selectRole = event?.target.value;
        setRole(selectRole);
    }

    function saveRole() {
        dispatch(editRoleAction(props.user.id, role))
        setIsEdit(false);
    }

    function editRole() {
        setIsEdit(true);
    }

    function cancelRole() {
        setRole(fromNumberRole(props.user.role));
        setIsEdit(false);
    }

    return <div className="user-component">
        <div>
            <div>
                <label htmlFor="name">Name:</label>
                <span id="name">{props.user.firstName}</span>
            </div>
            <div>
                <select disabled={!isEdit} value={role?.toString()} onChange={ev => onChange(ev)}>
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
                {props.user.tags.map(tag => <div className="tag-wrapper tag_offset">{tag}</div>)}
            </div>
        </div>
        <div className="user-row__btn-panel">
            {isEdit && <><button className="save-role-button btn" onClick={saveRole}>Save role</button><br /></>}
            {!isEdit && <><button className="save-role-button btn" onClick={editRole}>Edit role</button><br /></>}
            {isEdit && <><button className="save-role-button btn" onClick={cancelRole}>Cancel</button><br /></>}
        </div>
    </div >
}