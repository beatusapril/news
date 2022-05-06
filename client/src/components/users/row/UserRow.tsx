import { useState } from "react";
import { useDispatch } from "react-redux";
import { editRoleAction } from "../../../store/users/usersAction";
import { Role } from "../../../types/User";
import { fromNumberRole } from "../../../utils/Utils";
import { UserRowProps } from "./UserRowTypes";

export function UserRow(props: UserRowProps){
    const [role, setRole] = useState<Role | null>(fromNumberRole(props.user.role));
    const dispatch = useDispatch()

    function onChange(event: any) {
        const selectRole = event?.target.value;
        setRole(selectRole);
    }

    function saveRole(){
        dispatch(editRoleAction(props.user.id, role))
    }

    return <div>
        <label htmlFor="name">Name</label>
        <span id="name">{props.user.firstName}</span>
        <label htmlFor="lastname">Last name</label>
        <span id="lastname">{props.user.lastName}</span>
        <label htmlFor="login">Login</label>
        <span id="login">{props.user.login}</span>
        <label htmlFor="login">Login</label>
        <span id="login">{props.user.login}</span>
        <label htmlFor="login">Role</label>
        <select value={role?.toString()} onChange={ev => onChange(ev)}>
            <option>{Role.admin}</option>
            <option>{Role.writer}</option>
            <option>{Role.reader}</option>
        </select>
        <label htmlFor="phone">Phone</label>
        <span id="phone">{props.user.phone}</span>
        <button onClick={saveRole}>Save role</button>
        -----------------------------------
    </div>
}