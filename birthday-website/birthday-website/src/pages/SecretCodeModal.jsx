// SecretCodeModal.jsx
import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

const SecretCodeModal = ({ isOpen, onClose, onUnlock }) => {
  const [code, setCode] = useState('');

  if (!isOpen) return null;

  const handleUnlock = () => {
    // You can replace this logic as needed
    if (code.trim().toLowerCase() === 'loveyou') {
      onUnlock();
    } else {
      alert('Incorrect code! Try again 💔');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 shadow-xl relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-rose-600">
            <Lock className="w-5 h-5" />
            Secret Message
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="text-4xl mb-4 text-rose-500">❤️</div>
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            Enter Our Special Code
          </h4>
          <p className="text-gray-500 mb-6">
            You know the words that make my heart skip a beat...
          </p>

          <input
            type="password"
            placeholder="Enter our special code..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-pink-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300 text-center text-gray-700"
          />

          <button
            onClick={handleUnlock}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Unlock My Heart 💕
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecretCodeModal;
