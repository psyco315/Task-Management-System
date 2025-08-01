const SignUp = () => {

  return (
    <div className="flex flex-col justify-center items-center w-3/4 h-screen ">

      <h2 className="text-3xl font-semibold mb-12 hover:cursor-default">Sign Up</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="w-4/5 mb-4 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
      />

      <input
        type="email"
        placeholder="Email"
        className="w-4/5 mb-4 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-4/5 mb-4 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-4/5 mb-6 px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
      />

      <button
        className="bg-white/10 text-lg px-10 py-3 rounded-xl shadow-md border border-white/20 hover:bg-white/20 transition duration-150 ease-in-out hover:scale-[1.02] hover:shadow-xl cursor-pointer"
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
