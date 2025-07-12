import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoints } from '../operations/apis';

export default function TimelineForm({ onSubmit }) {
  const [birthdayId, setBirthdayId] = useState('');
  const [timelineEvents, setTimelineEvents] = useState([
    { date: '', location: '', title: '', description: '', file: null, icon: '💖' },
  ]);
  const [loading, setLoading] = useState(false);
  const [apiSuccess, setApiSuccess] = useState('');
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('birthdayId');
    if (id) {
      setBirthdayId(id);
    } else {
      alert('No birthdayId found. Please complete the previous steps.');
    }
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...timelineEvents];
    updated[index][field] = value;
    setTimelineEvents(updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...timelineEvents];
    updated[index].file = file;
    setTimelineEvents(updated);
  };

  const addEvent = () => {
    setTimelineEvents([
      ...timelineEvents,
      { date: '', location: '', title: '', description: '', file: null, icon: '💍' },
    ]);
  };

  const removeEvent = (index) => {
    if (timelineEvents.length === 1) return;
    setTimelineEvents(timelineEvents.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiSuccess('');
    setApiError('');
    setLoading(true);

    if (!birthdayId) {
      alert('Missing birthday ID!');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      const timelinesData = timelineEvents.map(({ file, ...rest }) => ({
        ...rest,
        birthdayId,
      }));
      formData.append('timelinesData', JSON.stringify(timelinesData));

      timelineEvents.forEach((event) => {
        if (event.file) {
          formData.append('image', event.file);
        }
      });

      const res = await axios.post(endpoints.BIRTHDAY_TIME, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setApiSuccess(res.data.message || 'Timeline events saved successfully!');
      setTimelineEvents([
        { date: '', location: '', title: '', description: '', file: null, icon: '💖' },
      ]);

      if (onSubmit) onSubmit(); // 🔔 Trigger next form (like SecretCodeForm)
    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
      setApiError(err.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-8 rounded w-full max-w-3xl space-y-6"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-bold text-center text-blue-500">Add Timeline Events 🕰️</h2>

      {loading && <p className="text-blue-600 font-medium text-center">Saving timeline...</p>}
      {apiSuccess && <p className="text-green-600 font-bold text-center">{apiSuccess}</p>}
      {apiError && <p className="text-red-600 font-bold text-center">{apiError}</p>}

      {timelineEvents.map((event, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
          <input
            className="border p-2 rounded"
            placeholder="Date (e.g. Feb 14, 2020)"
            value={event.date}
            onChange={(e) => handleChange(index, 'date', e.target.value)}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Location"
            value={event.location}
            onChange={(e) => handleChange(index, 'location', e.target.value)}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={event.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Description"
            value={event.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded"
            onChange={(e) => handleFileChange(index, e.target.files[0])}
          />
          <select
            className="border p-2 rounded"
            value={event.icon}
            onChange={(e) => handleChange(index, 'icon', e.target.value)}
          >
            <option value="💖">💖 Love</option>
            <option value="💍">💍 Ring</option>
            <option value="🎉">🎉 Party</option>
            <option value="📸">📸 Photo</option>
            <option value="🌹">🌹 Rose</option>
          </select>

          {timelineEvents.length > 1 && (
            <button
              type="button"
              onClick={() => removeEvent(index)}
              className="text-red-500 font-bold hover:scale-110"
            >
              🗑️
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={addEvent}
          className="bg-gray-200 px-4 py-2 text-sm rounded hover:bg-gray-300"
        >
          ➕ Add Event
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Timeline'}
        </button>
      </div>
    </form>
  );
}
