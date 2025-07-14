import React from 'react';
import { toast } from 'react-hot-toast';

const GenerateLinkButton = ({ birthdayId }) => {
  const handleCopy = () => {
    const url = `${window.location.origin}/welcome/${birthdayId}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      🔗 Generate Link
    </button>
  );
};

export default GenerateLinkButton;
