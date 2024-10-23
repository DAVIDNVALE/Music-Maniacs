import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Post from './components/Post'
import Details from './components/Details'
import Update from './components/Update'



function App() {


  return (
    <>
    <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/post" element={<Post/>}/>
      <Route path='/details/song/:id' element={<Details/>} />
      <Route path='/update/song/:id' element={<Update/>} />
    </Routes>
    </>
  )
}

export default App
