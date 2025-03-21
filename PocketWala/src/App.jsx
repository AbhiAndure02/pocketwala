import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Order from './pages/Order'
import Admin from './pages/Admin'


const App = () => {
return(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Order />} />
    <Route path="/admin" element={<Admin />} />
  </Routes>
  
  </BrowserRouter>
   
  )
}

export default App