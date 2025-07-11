import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { endpoints } from '../operations/apis';
import TimelineForm from '../pages/TimelineForm'
// ✅ Define API constants


export default function Start() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [happyText, setHappyText] = useState('');
  const [birthdayText, setBirthdayText] = useState('');
  const [message, setMessage] = useState('');
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showThirdForm, setShowThirdForm] = useState(false);
  const [birthdayId, setBirthdayId] = useState(localStorage.getItem('birthdayId') || null);

  const [memories, setMemories] = useState([{ title: '', category: '', file: null }]);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const handleFirstSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');
    setApiSuccess('');

    try {
      const birthdayResponse = await fetch(endpoints.BIRTHDAY_CREATE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname,
          happyText,
          birthdayText,
          message,
        }),
      });

      if (!birthdayResponse.ok) {
        const errorData = await birthdayResponse.json();
        throw new Error(errorData.message || 'Failed to create Birthday entry');
      }

      const birthdayData = await birthdayResponse.json();
      const createdBirthdayId = birthdayData._id;

      setBirthdayId(createdBirthdayId);
      localStorage.setItem('birthdayId', createdBirthdayId);

      setApiSuccess('Birthday details saved! Now add memories.');
      setShowSecondForm(true);
    } catch (error) {
      console.error('Error creating Birthday:', error);
      setApiError(error.message || 'Error saving birthday details.');
    } finally {
      setLoading(false);
    }
  };

  const handleMemorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');
    setApiSuccess('');

    if (!birthdayId) {
      setApiError('Birthday ID is missing. Please complete the first step.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    const memoriesDataArray = [];

    const validMemories = memories.filter(m => m.title && m.category && m.file);
    if (validMemories.length === 0) {
      setApiError('Please add at least one complete memory with an image.');
      setLoading(false);
      return;
    }

    for (let i = 0; i < validMemories.length; i++) {
      const memory = validMemories[i];
      memoriesDataArray.push({
        birthdayId,
        title: memory.title,
        category: memory.category,
      });
      formData.append('images', memory.file);
    }

    formData.append('memoriesData', JSON.stringify(memoriesDataArray));

    try {
      console.log(formData)
      const response = await fetch(endpoints.MEMORY_CREATE, {
        method: 'POST',
        body: formData,
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save memories');
      }

      const data = await response.json();
      setApiSuccess(`✅ ${data.message || 'Memories saved successfully!'}`);
      console.log('Memories API Response:', data);

      setMemories([{ title: '', category: '', file: null }]);
      setShowThirdForm(true);
    } catch (error) {
      console.error('Error saving memories:', error);
      setApiError(error.message || 'Error saving memories. Please try again.');
    } finally {
      setLoading(false);
    }
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

  const handleFileChange = (index, fileList) => {
    const updated = [...memories];
    if (fileList && fileList.length > 0) {
      updated[index].file = fileList[0];
    } else {
      updated[index].file = null;
    }
    setMemories(updated);
  };

  const addNewMemoryRow = () => {
    setMemories([...memories, { title: '', category: '', file: null }]);
  };

  const deleteMemoryRow = (index) => {
    if (memories.length === 1) return;
    setMemories(memories.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-pink-50 py-10 px-4 space-y-10">
      {loading && <p className="text-blue-600">Loading...</p>}
      {apiError && <p className="text-red-600 font-bold">{apiError}</p>}
      {apiSuccess && <p className="text-green-600 font-bold">{apiSuccess}</p>}

      {!showSecondForm && (
        <form onSubmit={handleFirstSubmit} className="bg-white shadow p-8 rounded w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center text-pink-500">Let's Begin 💖</h1>
          <input className="w-full border p-2 rounded" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
          <input className="w-full border p-2 rounded" placeholder="Happy Text" value={happyText} onChange={(e) => setHappyText(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Birthday Text" value={birthdayText} onChange={(e) => setBirthdayText(e.target.value)} />
          <textarea className="w-full border p-2 rounded" placeholder="Message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition" disabled={loading}>
            {loading ? 'Creating...' : 'More'}
          </button>
        </form>
      )}

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
                  onChange={(e) => handleFileChange(index, e.target.files)}
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
            <button type="submit" className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600" disabled={loading}>
              {loading ? 'Saving...' : 'Save Memories'}
            </button>
          </div>
        </form>
      )}

      {showThirdForm && birthdayId && (
        <div className="w-full flex flex-col items-center gap-6">
        <TimelineForm/>
          <button
            onClick={handleShow}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          >
            🎉 Show Your Birthday Page
          </button>
        </div>
      )}
    </div>
  );
}
