import { use, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/user"

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });

  const [error, setError] = useState("");
  const { currUser, setCurrUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    setError("");

    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    console.log('submiting:', formData)

    try {
      const res = await axios.post("http://localhost:3000/auth/signup", {
        name, email, password, role
      });

      const { user, token } = res.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem('user', JSON.stringify(user));

      setCurrUser(res.data.user);
      // console.log('User created: ', user._id)
      // console.log('User confirm: ', currUser)
      navigate('/group');
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-3/4 h-screen">
      <h2 className="text-3xl font-semibold mb-12 hover:cursor-default">Sign Up</h2>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-4/5 mb-4 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-4/5 mb-4 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-4/5 mb-4 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-4/5 mb-4 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
      />

      {/* Role Selection - Radio Buttons */}
      <div className="w-4/5 mb-6">
        <label className="block text-white/90 text-sm font-medium mb-3">
          Select Role
        </label>
        <div className="flex gap-6">
          <label className="flex items-center text-white/90 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="user"
              checked={formData.role === "user"}
              onChange={handleChange}
              className="mr-2 accent-white/70"
            />
            User
          </label>
          <label className="flex items-center text-white/90 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={formData.role === "admin"}
              onChange={handleChange}
              className="mr-2 accent-white/70"
            />
            Admin
          </label>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-white/10 text-lg px-10 py-3 rounded-xl shadow-md border border-white/20 hover:bg-white/20 transition duration-150 ease-in-out hover:scale-[1.02] hover:shadow-xl cursor-pointer"
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;