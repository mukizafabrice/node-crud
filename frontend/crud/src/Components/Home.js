import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]); // State for user data
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/user/getAllUsers"
        ); // Replace with your actual API endpoint
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container-fluid flex flex-col justify-center items-center w-full min-h-screen bg-gray-700">
      <div className="w-full md:w-2/5 bg-white shadow-xl rounded-md p-5">
        <h3 className="text-lg font-semibold text-center mb-2">
          States & Cities
        </h3>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <table className="min-w-full border-collapse border-slate-500 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-slate-600 p-2">Id</th>
              <th className="border border-slate-600 p-2">Username</th>
              <th className="border border-slate-600 p-2">Email</th>
              <th className="border border-slate-600 p-2" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="border border-slate-700 p-2">{index + 1}</td>
                <td className="border border-slate-700 p-2">{user.name}</td>
                <td className="border border-slate-700 p-2">{user.email}</td>
                <td className="border border-slate-700 p-2">
                  <button className="bg-blue-700 rounded-sm px-6 py-2 text-center">
                    Edit
                  </button>
                </td>
                <td className="border border-slate-700 p-2">
                  <button className="bg-red-700 rounded-sm p-2">Delete</button>
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
