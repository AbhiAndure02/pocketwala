import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { app } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuth = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // ✅ send name & email only (backend generates password if new)
      const response = await axios.post('http://localhost:5050/api/users/google', {
        name: result.user.displayName,
        email: result.user.email,
      });

      if (response.status === 200) {
        // ✅ backend already returns { user, token }
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        navigate('/');
      }
    } catch (error) {
      console.error('Could not sign in with Google', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition duration-300 shadow-sm"
    >
      <AiFillGoogleCircle className="w-6 h-6 text-blue-500" />
      Continue with Google
    </button>
  );
};

export default OAuth;
