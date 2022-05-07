import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { ADMIN } from "../../consts/consts";
import { getUser } from "../../selectors/selectors";
import { fetchMeAction, logout } from "../../store/login/actionLogin";
import { Store } from "../../store/Types";
import { UserInfo } from "../../types/User";

export function Header() {
    const user = useSelector<Store, UserInfo | null>(state => getUser(state));
    const dispatch = useDispatch();

    useEffect(() => {dispatch(fetchMeAction())}, []);

    function logoutHandler() {
        dispatch(logout());
    }

    if (!user && !localStorage.getItem("auth")){
        return <Navigate to="/"/>
    }
    return <div>
        {user && <><ul>
            {user.role === ADMIN && <li><Link to="/users">Users</Link></li>}
            {user.role === ADMIN && <li><Link to="/tags">Tags</Link></li>}
            <li><Link to="/news">News</Link></li>
        </ul>
            <button onClick={logoutHandler}>Logout</button></>}
    </div>
}