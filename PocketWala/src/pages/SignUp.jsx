import React from 'react'

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white to-indigo-300 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 max-w-full text-center">
        <h1 className="text-green-600 text-5xl font-extrabold opacity-90 mb-6">Sign Up</h1>
        <form className="flex flex-col gap-5">
          <input type="text" placeholder="Full Name" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg" />
          <input type="email" placeholder="Email" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg" />
          <input type="password" placeholder="Password" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg" />
          <textarea placeholder="Address" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg resize-none" rows="3"></textarea>
          <button type="submit" className="bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300 shadow-md">Sign Up</button>
        </form>
        <p className="mt-4 text-gray-600">Already have an account? <a href="#" className="text-green-500 hover:underline">Sign In</a></p>
      </div>
    </div>
  )
}

export default SignUp
