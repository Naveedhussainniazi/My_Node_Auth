import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SIgnup from './pages/Signup';
import Deshboard from './pages/Deshboard';
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<SIgnup />}/>
        <Route path='/deshboard' element={<Deshboard />}/>
      </Routes>
    </>
  )
}

export default App