import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [testCode, setTestCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !className || !testCode) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BC_URI}/loginuser`, {
        name,
        className,
        testCode,
      });

      if (response.status === 200) {
        console.log('Login successful!');
        Cookies.set('auth_token', response.data.token);
        navigate('/heropage');
      } else {
        setErrorMessage(response.data.message || 'Login failed.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-28">
        <h2 className=" flex justify-center text-center text-2xl text-gray-800 mb-4">Login as student</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-300 rounded-md text-lg"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter your class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-300 rounded-md text-lg"
          />
        </div>
        <div>
          <input
            placeholder="Enter your test code"
            value={testCode}
            onChange={(e) => setTestCode(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-300 rounded-md text-lg h-11 resize-none"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 transition duration-300">
          Submit
        </button>
        <p className="flex justify-center mt-3 text-blue-500 hover:underline">
          <a href="/loginadmin">Login as admin</a>
        </p>
      </form>
    </>
  );
}

export default Login;