import { useState } from 'react'
import './index.css'
import Hero from './components/Hero.jsx'
import Highlights from './components/Highlights.jsx'
import Navbar from './components/Navbar.jsx'
import Model from './components/Model.jsx'
function App() {

  return (
    <>
        <Navbar/>
        <Hero/>
        <Highlights/>
        <Model/>
    </>
  )
}

export default App
