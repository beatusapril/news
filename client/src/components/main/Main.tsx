import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { getUser } from "../../selectors/User";
import { Store } from "../../store/Types";
import { Login } from "../login/Login";
import { Link, Navigate } from 'react-router-dom'
import {  logout } from "../../store/login/actionLogin";
import { SignUp } from "../signup/SignUp";
import { Header } from "../header/Header";

export function Main() {
  const user = useSelector<Store>(state => getUser(state));

  return <>{user && <div>
    <Header></Header>
  </div>}
  {!user && <div> <Link to="/login">Login</Link> Not Register? <Link to="signup">Register</Link></div>}
  </>
}