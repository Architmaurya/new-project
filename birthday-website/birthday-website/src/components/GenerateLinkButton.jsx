// src/components/GenerateLinkButton.jsx

import React, { useState } from 'react';
// import toast from 'react-hot-toast';

const GenerateLinkButton = () => {
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const birthdayId = localStorage.getItem('birthdayId');
    if (!birthdayId) {
      toast.error('❌ No birthdayId found in localStorage!');
      return;
    }

    const shareUrl = `${window.location.origin}/welcome/${birthdayId}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        toast.success('✅ Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('❌ Failed to copy the link.');
      });
  };

  return (
    <button
      onClick={handleGenerate}
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full shadow-lg transition-all"
    >
      {copied ? 'Link Copied!' : 'Generate Share Link'}
    </button>
  );
};

export default GenerateLinkButton;
