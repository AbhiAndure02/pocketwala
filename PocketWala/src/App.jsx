import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Order from './pages/Order'
import Admin from './pages/Admin'
import Header from './components/Header'


const App = () => {
return(
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Order />} />
    <Route path="/admin" element={<Admin />} />
  </Routes>
  
  </BrowserRouter>
   
  )
}

export default App