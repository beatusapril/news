import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Main } from './components/main/Main';
import { Navigate, Route, Routes } from 'react-router';
import { SignUp } from './components/signup/SignUp';
import { Login } from './components/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './selectors/selectors';
import { Store } from './store/Types';
import { logout } from './store/user/actionUser';
import { ADMIN } from './consts/consts';
import { UserInfo, UserResponse } from './types/User';
import { Users } from './components/users/Users';
import { Tags } from './components/tags/Tags';
import { News } from './components/news/News';
import { NewsCreate } from './components/news/newCreate/NewsCreate';
import { NewsSubscribe } from './components/news/newsSubscribe/NewsSubscribe';
import { Profile } from './components/profile/Profile';
import "./normalize.css"

function App() {
  const user = useSelector<Store, UserInfo | null>(state => getUser(state));
  return (
    <>
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={user ? <Navigate to="/" /> : <Login />}></Route>
          <Route path='/signup' element={user ? <Navigate to="/" /> : <SignUp />}></Route>
          <Route path='/users' element={<Users />}></Route>
          <Route path='/tags' element={<Tags />}></Route>
          <Route path='/news' element={<News />}></Route>
          <Route path='/news/create' element={<NewsCreate />}></Route>
          <Route path='/news-subscribe' element={<NewsSubscribe />}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
      </React.Fragment>
    </>
  );
}

export default App;
