import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../lib/firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="p-4 rounded-lg shadow-md">
        <h4 className="text-center font-semibold text-lg">Login</h4>
        <div className="pt-2">
          <button
            onClick={handleLogin}
            className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-100
            flex gap-2 items-center
            "
          >
            <img src="/assets/icons/google.svg" alt="" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
