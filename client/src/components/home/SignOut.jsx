import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user"); // optional: if you store user ID or info
    localStorage.removeItem("currUser"); // optional: if you store user ID or info
    window.location.href = "http://localhost:5173/";
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white h-max px-4 py-2 rounded hover:bg-red-600"
    >
      <div>Sign Out</div>
    </button>
  );
};

export default SignOut;
