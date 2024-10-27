import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post("http://localhost:5001/api/user/create", {
        name,
        email,
        password,
      });
      setSuccess("Registration successful! You can now log in.");
    } catch (error) {
      console.error(error); // Log error to console for debugging
      setError(error.response?.data?.error || "An error occurred while trying to register.");
    }
    
  };

  return (
    <div className="container-fluid flex flex-col justify-center items-center w-full min-h-screen bg-gray-700">
      <div className="w-2/5  bg-white color-black shadow-xl rounded-md">
        <h1 className="text-center text-xl font-bold pt-6 underline">
          Create Account?
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="m-6">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm text-left font-medium text-slate-700">
                Username
              </span>
              <input
                type="text"
                name="name"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="Username..."
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
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
                placeholder="password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </div>
          <div className="m-6">
            <button
              type="submit"
              className="bg-slate-900 w-full p-2 text-white rounded font-bold"
            >
              Register
            </button>
          </div>
          <div className="m-6">
            <p className="text-right text-blue-900">
              I'm Already a user <Link to="/">Signin here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
