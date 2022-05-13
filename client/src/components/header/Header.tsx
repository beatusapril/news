import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { ADMIN } from "../../consts/consts";
import { getUser } from "../../selectors/selectors";
import { fetchMeAction, logout } from "../../store/user/actionUser";
import { Store } from "../../store/Types";
import { UserInfo } from "../../types/User";
import '../header/Header.css'

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
    return <div className="header__wrapper">
        <div className="wrapper">
        <div className="header-block">
        <div className="header__wrapper__logo">News</div>
        {user && <><ul className="header-menu-list">
            {user.role === ADMIN && <li className="header-menu-list__item"><Link to="/users">Users</Link></li>}
            {user.role === ADMIN && <li className="header-menu-list__item"><Link to="/tags">Tags</Link></li>}
            <li className="header-menu-list__item"><Link to="/news" >News</Link></li>
            <li className="header-menu-list__item"><Link to="/profile">Profile</Link></li>
        </ul>
            <button onClick={logoutHandler} className="btn btn-logout">Logout</button></>}
            </div>
            </div>
    </div>
}