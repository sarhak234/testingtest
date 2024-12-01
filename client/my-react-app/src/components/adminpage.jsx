import React, { useState } from 'react';
import axios from 'axios';

function adminpage() {
  const [testcode, setTestcode] = useState('');
  const [array, setArray] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let parsedArray;
    try {
      parsedArray = JSON.parse(array); // Parse if it's a JSON string
    } catch (error) {
      alert('Invalid array format! Please provide valid JSON.');
      return;
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BC_URI}/adminpage`, {
        testcode,
        parsedArray: parsedArray,
      });
      alert('Submitted successfully!');
      setTestcode('');
      setArray('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen">
      <form onSubmit={handleSubmit} className="w-full" style={{ maxWidth: '80vw' }}>
        <div className="mb-4">
          <label htmlFor="testcode" className="block mb-2 text-lg text-white">Test Code</label>
          <input
            id="testcode"
            type="text"
            placeholder="Enter test code"
            value={testcode}
            onChange={(e) => setTestcode(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded-md text-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="array" className="block mb-2 text-lg text-white">Array</label>
          <textarea
            id="array"
            placeholder="Enter array values"
            value={array}
            onChange={(e) => setArray(e.target.value)}
            className="flex justify-center h-48 p-2 w-full border border-gray-300 rounded-md text-lg resize-none"
            style={{ resize: 'none' }}
          />
        </div>
        <button type="submit" className="bg-white text-blue-500 font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default adminpage;
