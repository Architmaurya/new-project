import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import axios from 'axios';
import { endpoints } from '../operations/apis';

const SecretCodeModal = ({ isOpen, onClose, onUnlock }) => {
  const [code, setCode] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [flipped, setFlipped] = useState(false);

  if (!isOpen) return null;

  const handleUnlock = async () => {
    const birthdayId = localStorage.getItem('birthdayId');

    if (!code.trim()) {
      alert('Please enter the secret code!');
      return;
    }

    if (!birthdayId) {
      alert('Birthday ID not found. Please refresh the page.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(endpoints.SECRET_CODE_CHECK, {
        code,
        birthdayId,
      });

      setResponseMessage(res.data.message || 'Unlocked!');
      setFlipped(true); // ✅ Flip the card

      // ⏳ Wait before running the unlock logic
  const minutes = 1;
    setTimeout(() => {
      setFlipped(false);
      setCode('');
      setResponseMessage('');
    }, minutes * 60 * 1000);// match the flip animation duration


    } catch (err) {
      console.error(err);
      setResponseMessage('❌ Incorrect code! Try again 💔');
      setFlipped(true); // Optional: flip even on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center">
      <div className="w-full max-w-md mx-4">
        <div className="relative w-full min-h-[380px] perspective">
          <div
            className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
              flipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front Side */}
            <div className="absolute inset-0 bg-white rounded-2xl shadow-xl backface-hidden flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-rose-600">
                  <Lock className="w-5 h-5" />
                  Secret Message
                </h3>
                <button onClick={onClose}>
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              <div className="p-6 text-center flex-1 flex flex-col justify-center">
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
                  className="w-full border border-pink-400 rounded-xl px-4 py-3 text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />

                <button
                  onClick={handleUnlock}
                  className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 rounded-xl transition duration-300"
                  disabled={loading}
                >
                  {loading ? 'Unlocking...' : 'Unlock My Heart 💕'}
                </button>
              </div>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 bg-white rounded-2xl shadow-xl rotate-y-180 backface-hidden flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-green-600">
                  🥰 Message Unlocked!
                </h3>
                <button onClick={onClose}>
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>

              <div className="p-6 text-center flex-1 flex flex-col justify-center">
                <div className="text-4xl mb-4 text-green-500">💌</div>
                <p className="text-lg font-semibold text-gray-700">{responseMessage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind custom styles for flip */}
      <style>
        {`
          .perspective {
            perspective: 1000px;
          }
          .transform-style {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}
      </style>
    </div>
  );
};

export default SecretCodeModal;
