import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
        <header className="flex justify-between bg-blue-500 text-white p-4">
            <h1 className="text-3xl font-bold text-center">PocketWala</h1>
            <nav className="flex justify-center mt-4">
            <Link to='/' className="mx-4 text-lg hover:text-gray-200">Home</Link>
            <Link to="/order" className="mx-4 text-lg hover:text-gray-200">Bulk Order</Link>
            <Link to = '/signin' className="mx-4 text-lg hover:text ">Sign In</Link>
            <Link to="/admin" className="mx-4 text-lg hover:text-gray-200">Admin</Link>
            </nav>
        </header>

  )
}

export default Header