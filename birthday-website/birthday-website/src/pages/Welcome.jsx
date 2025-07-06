import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { endpoints } from '../operations/apis';

const Welcome = () => {
  const { birthdayId } = useParams();
  const [birthdayData, setBirthdayData] = useState({
    nickname: '',
    happyText: '',
    birthdayText: '',
    message: '',
  });

  useEffect(() => {
    const id = birthdayId || localStorage.getItem('birthdayId');
    if (!id) {
      console.warn('⚠️ No birthdayId in URL or localStorage');
      return;
    }

    localStorage.setItem('birthdayId', id);

    const url = endpoints.BIRTHDAY_GETWISHE(id);
    console.log('📡 Fetching birthday data from:', url);

    axios.get(url)
      .then((res) => {
        const data = res.data?.data;
        if (!data) return;

        setBirthdayData({
          nickname: data.nickname || '',
          happyText: data.happyText || '',
          birthdayText: data.birthdayText || '',
          message: data.message || '',
        });
      })
      .catch((err) => {
        console.error('❌ API Error:', err.response?.data || err.message);
      });
  }, [birthdayId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 px-4 text-center overflow-hidden">
      
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-pink-600 mb-2"
      >
        {birthdayData.happyText || 'Happy'}{' '}
        <span className="text-purple-600 italic">
          {birthdayData.birthdayText || 'Birthday'}
        </span>
      </motion.h1>

      {/* Nickname */}
      <motion.h2
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="text-3xl font-semibold text-gray-800 mb-4"
      >
        My Dearest{' '}
        <span className="text-pink-500 font-extrabold italic">
          {birthdayData.nickname || 'Sona'}
        </span>
      </motion.h2>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="text-lg max-w-3xl text-gray-700 leading-relaxed mb-6"
      >
        {birthdayData.message ||
          "You're amazing, and I'm grateful for every moment with you 💖"}
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.6 }}
        className="flex gap-6 mb-6"
      >
        <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
          Moments That Stayed
        </button>
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
          Through It All
        </button>
      </motion.div>

      {/* Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 0.8 }}
        className="mt-6 text-gray-600 text-3xl animate-bounce"
      >
        ↓
        <p className="text-base mt-2">Scroll to explore</p>
      </motion.div>
    </div>
  );
};

export default Welcome;
