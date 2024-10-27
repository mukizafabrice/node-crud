import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [error, setError] = useState("");

  return (
    <div className="container-fluid flex flex-col justify-center items-center w-full min-h-screen bg-gray-700">
      <div className="w-full md:w-2/5 bg-white shadow-xl rounded-md p-5">
        <h3 className="text-lg font-semibold text-center mb-2">
          States & Cities
        </h3>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <table className="min-w-full 	border-collapse: collapse; border-slate-500 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-slate-600 p-2">State</th>
              <th className="border border-slate-600 p-2">City</th>
              <th className="border border-slate-600 p-2" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-700 p-2">Indiana</td>
              <td className="border border-slate-700 p-2">Indianapolis</td>
              <td className="border border-slate-700 p-2">
                <button className="bg-blue-700 rounded-sm pr-4 ">Edit</button>
              </td>
              <td className="border border-slate-700 p-2">
                <button className="bg-red-700 rounded-sm p-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
