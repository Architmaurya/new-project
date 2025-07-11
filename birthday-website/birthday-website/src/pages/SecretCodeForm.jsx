import React, { useState } from 'react';

const SecretCodeForm = ({ onSubmit }) => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('Love');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.trim().toLowerCase() !== 'loveyou') {
      alert('Incorrect secret code! 💔');
      return;
    }

    const formData = new FormData();
    formData.append('code', code);
    formData.append('message', message);


    await onSubmit(formData);

    // Clear form
    setCode('');
    setMessage('');
 
  };

  return (
    <div className="bg-pink-50 p-6 rounded-2xl shadow-xl max-w-xl mx-auto mt-10 relative overflow-hidden">
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none animate-pulse z-0">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute text-pink-400 text-lg"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s infinite`,
            }}
          >
            💖
          </span>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4"
        encType="multipart/form-data"
      >
        <h2 className="col-span-2 text-2xl font-bold text-center text-blue-600">
          Unlock Secret Memory 🔐
        </h2>

        {/* Secret Code */}
        <input
          type="password"
          placeholder="Secret Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="col-span-2 border border-pink-300 px-4 py-2 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-rose-300"
        />

        {/* Message */}
        <textarea
          placeholder="Your secret message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="col-span-2 border border-pink-300 px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-rose-300"
        />

   

        <button
          type="submit"
          className="col-span-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition duration-300"
        >
          Unlock My Heart 💕
        </button>
      </form>
    </div>
  );
};

export default SecretCodeForm;
