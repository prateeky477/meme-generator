import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/SignUp';
import SavedMeme from './pages/SavedMeme';
import Home from "./pages/Home";
import Template from "./pages/Template";
import AuthRequired from './components/AuthRequired';
import Header from "./components/Header"
import LogOut from './components/LogOut';
import Error from './pages/Error';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/template" element={<Template />} />
        <Route path='/logout' element={<LogOut/>}/>
        <Route element={<AuthRequired />}>
          <Route path="/saved" element={<SavedMeme />} />
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </Router>
  );
};

export default App;
