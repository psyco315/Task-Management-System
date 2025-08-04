import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user"); // optional: if you store user ID or info
    localStorage.removeItem("currUser"); // optional: if you store user ID or info
    window.location.href = "/";
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
