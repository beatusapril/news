import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { getUser } from "../../selectors/User";
import { Store } from "../../store/Types";
import { Login } from "../login/Login";
import { Link, Navigate } from 'react-router-dom'
import { logout } from "../../store/login/actionLogin";
import { SignUp } from "../signup/SignUp";

export function Main() {
  const user = useSelector<Store>(state => getUser(state));
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(logout());
  }

  return <>{user && <div>
    <ul>

    </ul>
    <button onClick={logoutHandler}>Logout</button>
  </div>}
  {!user && <div> <Link to="/login">Login</Link> Not Register? <Link to="signup">Register</Link></div>}
  </>
}