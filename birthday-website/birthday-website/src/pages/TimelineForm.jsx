import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoints } from '../operations/apis';

export default function TimelineForm() {
  const [birthdayId, setBirthdayId] = useState('');
  const [timelineEvents, setTimelineEvents] = useState([
    { date: '', location: '', title: '', description: '', file: null, icon: '💖' },
  ]);

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

    if (!birthdayId) {
      alert('Missing birthday ID!');
      return;
    }

    try {
      for (let event of timelineEvents) {
        const formData = new FormData();
        formData.append('birthdayId', birthdayId);
        formData.append('date', event.date);
        formData.append('location', event.location);
        formData.append('title', event.title);
        formData.append('description', event.description);
        formData.append('icon', event.icon);
        if (event.file) {
          formData.append('image', event.file);
        }

        await axios.post(endpoints.BIRTHDAY_TIME, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      alert('🎉 All timeline events saved!');
      setTimelineEvents([
        { date: '', location: '', title: '', description: '', file: null, icon: '💖' },
      ]);
    } catch (err) {
      console.error('❌ Timeline Upload Error:', err.response?.data || err.message);
      alert('Failed to upload one or more timeline events.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-8 rounded w-full max-w-3xl space-y-6"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-bold text-center text-blue-500">Add Timeline Events 🕰️</h2>

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
        >
          Save Timeline
        </button>
      </div>
    </form>
  );
}
