import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]); // State for user data
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // State for success message
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/user/getAllUsers"
        ); // Replace with your actual API endpoint
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", err);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/user/delete/${id}`); // Adjust to your API delete endpoint
      setUsers(users.filter((user) => user.id !== id)); // Remove deleted user from state
      setSuccess("User deleted successfully!"); // Set success message
    } catch (err) {
      setError("Failed to delete user. Please try again.");
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-700 container-fluid">
      <div className="w-full p-5 bg-white rounded-md shadow-xl md:w-2/5">
        <h3 className="mb-2 text-lg font-semibold text-center">Name & email</h3>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">{success}</div>}{" "}
        {/* Display success message */}
        <table className="min-w-full mt-4 border-collapse border-slate-500">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-slate-600">Id</th>
              <th className="p-2 border border-slate-600">Username</th>
              <th className="p-2 border border-slate-600">Email</th>
              <th className="p-2 border border-slate-600" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="p-2 border border-slate-700">{index + 1}</td>
                <td className="p-2 border border-slate-700">{user.name}</td>
                <td className="p-2 border border-slate-700">{user.email}</td>
                <td className="p-2 border border-slate-700">
                  <Link to={`/update/${user._id}`}>
                    <button className="px-6 py-2 text-center bg-blue-700 rounded-sm">
                      Edit
                    </button>
                  </Link>
                </td>
                <td className="p-2 border border-slate-700">
                  <button
                    className="p-1 text-white bg-red-700 rounded-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
