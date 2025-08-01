import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/user';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setCurrUser } = useUser()

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/auth/signin', {
        email,
        password,
      });

      if (res.data.success) {
        setCurrUser(res.data.user);
        navigate('/task');
      } else {
        alert(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-3/4 h-screen">
      <h2 className="text-3xl font-semibold mb-12 hover:cursor-default">Sign In</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-4/5 mb-4 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-4/5 mb-6 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-white/10 text-lg px-10 py-3 rounded-xl shadow-md border border-white/20 hover:bg-white/20 transition duration-150 ease-in-out hover:scale-[1.02] hover:shadow-xl cursor-pointer"
      >
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
