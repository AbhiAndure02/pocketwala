import React from 'react'

const Header = () => {
  return (
        <header className="bg-blue-500 text-white p-4">
            <h1 className="text-3xl font-bold text-center">PocketWala</h1>
            <nav className="flex justify-center mt-4">
            <a href="/" className="mx-4 text-lg hover:text-gray-200">Home</a>
            <a href="/admin" className="mx-4 text-lg hover:text-gray-200">Admin</a>
            </nav>
        </header>

  )
}

export default Header