import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function loginadmin() {

  const navigate = useNavigate();

  const [adminname,setadminname]=useState();
  const [adminemail,setadminemail]=useState();
  const [adminpassword,setadminpassword]=useState();
  
 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${import.meta.env.VITE_BC_URI}/loginadmin`, { adminname, adminemail, adminpassword })
      .then((response) => {
        if (response.status >= 200 && response.status <= 210) {
          console.log("Successful login!", response.data);
          if (response.status === 200) {
            navigate("/adminpage");
          }
        } else {
          console.log("Unexpected status code:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };
  
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-28"
      >
        <h2 className="text-center text-2xl text-gray-800 mb-4">Login as admin</h2>
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={adminname}
            onChange={(e) => setadminname(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-300 rounded-md text-lg"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter your email"
            value={adminemail}
            onChange={(e) => setadminemail(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-300 rounded-md text-lg"
          />
        </div>
        <div>
          <input
            placeholder="Enter password"
           value={adminpassword}
            onChange={(e) => setadminpassword(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-300 rounded-md text-lg h-11 resize-none"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
        <p className="flex justify-center mt-3 text-blue-500 hover:underline">
          <a href="/">login as student</a>
        </p>
      </form>
    </>
  );
}
