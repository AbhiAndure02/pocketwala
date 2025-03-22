import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white to-indigo-300 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 max-w-full text-center">
        <h1 className="text-blue-600 text-5xl font-extrabold opacity-90 mb-6">Sign In</h1>
        <form className="flex flex-col gap-5">
          <input type="text" placeholder="Username" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
          <input type="password" placeholder="Password" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
          <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition duration-300 shadow-md">Sign In</button>
        </form>
        <p className="mt-4 text-gray-600">Don't have an account? <Link to='/signup' className="text-blue-500 hover:underline">Sign Up</Link></p>
      </div>
    </div>
  )
}

export default SignIn