import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Order from './pages/Order'
import Admin from './pages/Admin'
import Header from './components/Header'
import SingleOrder from './pages/SingleOrder'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'


const App = () => {
return(
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<SingleOrder />} />
    <Route path="/order" element={<Order />} />
    <Route path='/signin' element={<SignIn />} />
    <Route path='/signup' element={<SignUp />} />

    <Route path="/admin" element={<Admin />} />
  </Routes>
  
  </BrowserRouter>
   
  )
}

export default App