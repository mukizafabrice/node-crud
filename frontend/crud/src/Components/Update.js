import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from URL parameters
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [password, setPassword] = useState(""); // Password can be empty if not updating
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/user/getAllUsers/${id}` // Adjust the endpoint as necessary
        );

        // Check if data exists
        if (response.data) {
          setUserData(response.data); // Set user data to state
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.response?.data?.error || "Error loading user data.");
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Create a payload that includes user data and password if provided
    const payload = {
      ...userData, // Spread user data to include name, email, etc.
      ...(password && { password }), // Only include password if it's not empty
    };

    try {
      await axios.put(`http://localhost:5001/api/user/update/${id}`, payload);
      setSuccess("Update successful!");
      navigate("/home"); // Redirect after update
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error || "An error occurred while updating."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-700 container-fluid">
      <div className="w-2/5 bg-white rounded-md shadow-xl">
        <h1 className="pt-6 text-xl font-bold text-center underline">
          Update Account
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
                value={userData.name}
                className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="Username..."
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
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
                value={userData.email}
                className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="you@example.com"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </label>
          </div>
          <div className="m-6">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm text-left font-medium text-slate-700">
                Password (Leave empty to keep current)
              </span>
              <input
                type="password"
                name="password"
                value={password}
                className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="Password..."
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
              className="w-full p-2 font-bold text-white rounded bg-slate-900"
            >
              Update
            </button>
          </div>
          <div className="m-6">
            <p className="text-right text-blue-900">
              Back to <Link to="/home">Home</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
