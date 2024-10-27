import { useState } from "react";
import { Link } from "react-router-dom";
import axios  from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/login",
        {
          email,
          password
        }
      );
      navigate("/home");
    } catch (error) {
      setError(error.response.data.message || "failed to login");
    }
  };
  return (
    <div className="container-fluid flex flex-col justify-center items-center w-full min-h-screen bg-gray-700">
      <div className="w-2/5  bg-white color-black shadow-xl rounded-md">
        <h1 className="text-center text-xl font-bold pt-6 underline">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="m-6">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm text-left font-medium text-slate-700">
                Email
              </span>
              <input
                type="email"
                name="email"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="m-6">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm text-left font-medium text-slate-700">
                Password
              </span>
              <input
                type="password"
                name="password"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            {error && (
              <div className="m-6 text-red-500 text-center">{error}</div>
            )}
          </div>
          <div className="m-6">
            <button
              type="submit"
              className="bg-slate-900 w-full p-2 text-white rounded font-bold"
            >
              Login
            </button>
          </div>
          <div className="m-6">
            <p className="text-right text-blue-900">
              I'm not a user <Link to="/Signup">Signup here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
