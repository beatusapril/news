import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { getUser } from "../../selectors/selectors";
import { Store } from "../../store/Types";
import { Login } from "../login/Login";
import { Link, Navigate } from 'react-router-dom'
import {  logout } from "../../store/user/actionUser";
import { SignUp } from "../signup/SignUp";
import { Header } from "../header/Header";
import { NotAuth } from "../helpers/NotAuth";

export function Main() {
  const user = useSelector<Store>(state => getUser(state));

  if (user){
    return <Navigate to="/news"/>
  }

  return <>{user && <div>
    <Header></Header>
  </div>}
  {!user && <NotAuth/>}
  </>
}