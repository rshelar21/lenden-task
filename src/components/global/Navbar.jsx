import React from 'react'
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";


const Navbar = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        signOut(auth).then(() => {
            navigate("/login")
          }).catch((error) => {
            console.log(error.message);
          });
    }
  return (
    <div className='flex justify-between items-center px-8 py-2 border-b border-gray-100 shadow-lg'>
      <div>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
      </div>
      <div>
        <button className='border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100' onClick={handleLogOut}>
            Log Out
        </button>
      </div>
    </div>
  )
}

export default Navbar
