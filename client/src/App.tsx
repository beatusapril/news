import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Main } from './components/main/Main';
import { Navigate, Route, Routes } from 'react-router';
import { SignUp } from './components/signup/SignUp';
import { Login } from './components/login/Login';
import { useSelector } from 'react-redux';
import { getUser } from './selectors/User';
import { Store } from './store/Types';

function App() {
  const user = useSelector<Store>(state => getUser(state));
  return (
    <>
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/login' element={user ? <Navigate to="/" /> : <Login />}></Route>
          <Route path='/signup' element={user ? <Navigate to="/" /> : <SignUp />}></Route>
        </Routes>
      </React.Fragment>
    </>
  );
}

export default App;
