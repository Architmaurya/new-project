import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineForm from '../pages/TimelineForm';

export default function Start() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [happyText, setHappyText] = useState('');
  const [birthdayText, setBirthdayText] = useState('');
  const [message, setMessage] = useState('');
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showThirdForm, setShowThirdForm] = useState(false);
  const [birthdayId, setBirthdayId] = useState(localStorage.getItem('birthdayId') || null);
  const [memories, setMemories] = useState([{ title: '', category: '', files: [] }]);

  const handleFirstSubmit = (e) => {
    e.preventDefault();
    // No API call, just store the birthdayId
    const id = Date.now(); // Using a timestamp for a temporary ID
    setBirthdayId(id);
    localStorage.setItem('birthdayId', id);
    setShowSecondForm(true);
  };

  // Removed API call: no server request here
  const handleMemorySubmit = (e) => {
    e.preventDefault();
    // Instead of making an API request, you can store the memories in the state or perform any other operations
    console.log('Memories to save:', memories);

    alert('✅ Memories saved locally!');
    setMemories([{ title: '', category: '', files: [] }]);
    setShowThirdForm(true);
  };

  const handleShow = () => {
    const id = birthdayId || localStorage.getItem('birthdayId');
    if (id) navigate(`/welcome/${id}`);
  };

  const handleMemoryChange = (index, field, value) => {
    const updated = [...memories];
    updated[index][field] = value;
    setMemories(updated);
  };

  const handleFileChange = (index, files) => {
    const updated = [...memories];
    updated[index].files = Array.from(files); // Convert file list to an array
    setMemories(updated);
  };

  const addNewMemoryRow = () => {
    setMemories([...memories, { title: '', category: '', files: [] }]);
  };

  const deleteMemoryRow = (index) => {
    if (memories.length === 1) return;
    setMemories(memories.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-pink-50 py-10 px-4 space-y-10">
      {/* Step 1: Basic Details */}
      {!showSecondForm && (
        <form onSubmit={handleFirstSubmit} className="bg-white shadow p-8 rounded w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center text-pink-500">Let's Begin 💖</h1>
          <input className="w-full border p-2 rounded" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
          <input className="w-full border p-2 rounded" placeholder="Happy Text" value={happyText} onChange={(e) => setHappyText(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Birthday Text" value={birthdayText} onChange={(e) => setBirthdayText(e.target.value)} />
          <textarea className="w-full border p-2 rounded" placeholder="Message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition">More</button>
        </form>
      )}

      {/* Step 2: Upload Memories */}
      {showSecondForm && (
        <form onSubmit={handleMemorySubmit} className="bg-white shadow p-8 rounded w-full max-w-2xl space-y-6">
          <h2 className="text-xl font-bold text-center text-purple-500">Add Memories 📸</h2>
          {memories.map((memory, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b pb-4">
              <input
                className="border p-2 rounded"
                placeholder="Title"
                value={memory.title}
                onChange={(e) => handleMemoryChange(index, 'title', e.target.value)}
                required
              />
              <select
                className="border p-2 rounded"
                value={memory.category}
                onChange={(e) => handleMemoryChange(index, 'category', e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Our Memories">Our Memories</option>
                <option value="Special Moments">Special Moments</option>
                <option value="Celebrations">Celebrations</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="border p-2 rounded w-full"
                  multiple
                  onChange={(e) => handleFileChange(index, e.target.files)} // Allow multiple files
                  required
                />
                {memories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteMemoryRow(index)}
                    className="text-red-500 font-bold hover:scale-110"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <button type="button" onClick={addNewMemoryRow} className="bg-gray-200 px-4 py-2 text-sm rounded hover:bg-gray-300">
              ➕ Add Memory
            </button>
            <button type="submit" className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">
              Save Memories
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Timeline + Show */}
      {/* {showThirdForm && birthdayId && (
        <div className="w-full flex flex-col items-center gap-6">
          <TimelineForm birthdayId={birthdayId} />
          <button
            onClick={handleShow}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          >
            🎉 Show
          </button>
        </div>
      )} */}
    </div>
  );
}
