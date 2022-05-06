
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../selectors/User";
import { fetchMeAction } from "../../store/login/actionLogin";
import { Store } from "../../store/Types";
import { fetchUsersAction } from "../../store/users/usersAction";
import { UserInfo } from "../../types/User";
import { Header } from "../header/Header";
import { UserRow } from "./row/UserRow";

export function Users(){
    const users = useSelector<Store, UserInfo[]>(state => getUsers(state));
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchUsersAction());
        dispatch(fetchMeAction());
    }, [])

    return <div>
    <Header/>
    {users.map(user => <UserRow key={user.id} user={user}></UserRow>)}
    </div>
}