import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { getUser } from "../../selectors/User";
import { Store } from "../../store/Types";
import { Login } from "../login/Login";
import { Navigate } from 'react-router-dom'
import { logout } from "../../store/login/actionLogin";

export function Main(){
    const user = useSelector<Store>(state => getUser(state));
    const dispatch = useDispatch();

    function logoutHandler(){
        dispatch(logout());
    }

    if (!user){
        return <Navigate to="/login"></Navigate>
    }

    return <div>
        <ul>
        
      </ul>
      <button onClick={logoutHandler}>Logout</button>
      <React.Fragment>
        <Routes>
          <Route path='/' ></Route>
          <Route path='/login' element={user ? <Navigate to="/"/> : <Login/>}></Route>
        </Routes>
      </React.Fragment>
    </div>;
}