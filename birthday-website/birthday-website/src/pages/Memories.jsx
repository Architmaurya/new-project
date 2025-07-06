// ✅ FRONTEND: Memories.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../operations/apis';

const Memories = () => {
  const { birthdayId } = useParams();
  const [activeFilter, setActiveFilter] = useState('All Photos');
  const [memories, setMemories] = useState([]);
  const [touchedIndex, setTouchedIndex] = useState(null);
  const cardRefs = useRef([]); // ✅ Refs to track each card

  useEffect(() => {
    const id = localStorage.getItem('birthdayId');
    if (!id) {
      console.warn('⚠️ No birthdayId in URL or localStorage');
      return;
    }

    localStorage.setItem('birthdayId', id);

    const url = endpoints.MEMORY_GET(id);
    axios.get(url)
      .then((res) => setMemories(res.data.data || []))
      .catch((err) => console.error('❌ Failed to fetch memories:', err.response?.data || err.message));
  }, [birthdayId]);

  // ✅ Add outside click listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        touchedIndex !== null &&
        cardRefs.current[touchedIndex] &&
        !cardRefs.current[touchedIndex].contains(event.target)
      ) {
        setTouchedIndex(null); // ✅ Hide overlay if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [touchedIndex]);

  const uniqueCategories = [...new Set(memories.map((m) => m.category))];
  const filters = ['All Photos', ...uniqueCategories];

  const filteredMemories = activeFilter === 'All Photos'
    ? memories
    : memories.filter((m) => m.category === activeFilter);

  return (
    <div className="h-full bg-pink-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">Our Memories</h1>

      <div className="flex justify-center gap-4 flex-wrap mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full font-semibold ${
              activeFilter === filter ? 'bg-pink-500 text-white' : 'bg-white text-gray-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredMemories.length === 0 ? (
        <p className="text-center h-full text-gray-500">No memories found.</p>
      ) : (
        <div className="grid h-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {filteredMemories.map((memory, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)} // ✅ Assign ref to card
              className="group relative h-full bg-white shadow rounded-lg w-72 flex flex-col"
              onClick={() => setTouchedIndex(index === touchedIndex ? null : index)}
            >
              {/* ✅ Gradient Glow */}
              <div className="absolute inset-0 z-0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-500 before:content-[''] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-pink-500 before:via-yellow-400 before:to-purple-500 before:blur-xl before:opacity-60" />

              {/* ✅ Image with overlay title */}
              <div className="relative h-80 w-full overflow-hidden rounded z-10">
                <img
                  src={memory.img}
                  alt={memory.title}
                  className="h-full w-full object-cover shadow-lg transition duration-300 rounded"
                />
                <h3
                  className={`absolute bottom-0 left-1/2 
                    -translate-x-1/2 -translate-y-1/2
                    text-white text-xl font-semibold text-center
                    bg-black bg-opacity-40 px-3 py-1 rounded
                    transition-all duration-700 transform
                    ${
                      touchedIndex === index
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-10'
                    }
                    group-hover:translate-x-0 group-hover:opacity-100`}
                >
                  {memory.title || 'Untitled'}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Memories;
