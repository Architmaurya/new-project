import React, { useState } from 'react';
import axios from 'axios';
import { endpoints } from '../operations/apis';

const SecretCodeForm = ({ onSubmitComplete }) => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiSuccess, setApiSuccess] = useState('');
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiSuccess('');
    setApiError('');

    const birthdayId = localStorage.getItem('birthdayId');
    if (!birthdayId) {
      setApiError('Birthday ID not found. Please complete previous steps.');
      setLoading(false);
      return;
    }

    const payload = {
      code,
      message,
      birthdayId,
    };

    try {
      const response = await axios.post(endpoints.SECRET_CODE, payload);
      console.log('✅ API Response:', response.data);

      setApiSuccess(response.data.message || 'Secret saved successfully!');
      setCode('');
      setMessage('');

      if (onSubmitComplete) {
        onSubmitComplete();
      }
    } catch (error) {
      console.error('❌ Error:', error);
      setApiError(error.response?.data?.message || 'Failed to save secret. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-pink-50 p-6 rounded-2xl shadow-xl max-w-xl mx-auto mt-10 w-full">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 className="col-span-2 text-2xl font-bold text-center text-blue-600">
          Unlock Secret Memory 🔐
        </h2>

        {loading && <p className="col-span-2 text-blue-500 text-center font-medium">Saving secret...</p>}
        {apiSuccess && <p className="col-span-2 text-green-600 text-center font-bold">{apiSuccess}</p>}
        {apiError && <p className="col-span-2 text-red-600 text-center font-bold">{apiError}</p>}

        {/* Secret Code */}
        <input
          type="password"
          placeholder="Secret Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="col-span-2 border border-pink-300 px-4 py-2 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-rose-300"
          required
        />

        {/* Message */}
        <textarea
          placeholder="Your secret message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="col-span-2 border border-pink-300 px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-rose-300"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition duration-300"
        >
          {loading ? 'Saving...' : 'Unlock My Heart 💕'}
        </button>
      </form>
    </div>
  );
};

export default SecretCodeForm;
