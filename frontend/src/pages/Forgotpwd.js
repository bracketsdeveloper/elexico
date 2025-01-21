import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../common/index';

const Forgotpwd = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await fetch(SummaryApi.resetPassword.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('An error occurred while resetting the password.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      <input
        className="border p-2 mb-4 w-full max-w-md rounded-md"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button 
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-800 transition duration-300"
        onClick={handleResetPassword}
      >
        Reset Password
      </button>
      <ToastContainer />
    </div>
  );
};

export default Forgotpwd;
