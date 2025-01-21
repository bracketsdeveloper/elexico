import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../common/index';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); // Extract token from query params

  const handleResetPassword = async () => {
    try {
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }), // Send token and new password
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate('/login'); // Redirect to login page
        }, 2000); // Delay to allow user to see the success message
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('An error occurred while resetting the password.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      <input
        className="border p-2 mb-4 w-full max-w-md rounded-md"
        type="password"
        placeholder="Enter your new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
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

export default ResetPasswordForm;
