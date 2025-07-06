import { endpoints } from '../operations/api'; // Adjust path if needed
import axios from 'axios';

/**
 * Upload memory images with associated metadata
 * @param {string} birthdayId - ID of the related birthday wish
 * @param {Array<{title: string, category: string, file: File}>} memories
 * @returns {Promise<Object>} - Response from API
 */
export const uploadMemories = async (birthdayId, memories) => {
  const formData = new FormData();
  formData.append('birthdayId', birthdayId);

  // Prepare JSON metadata and append it
  const metadata = memories.map(({ title, category }) => ({ title, category }));
  formData.append('memories', JSON.stringify(metadata));

  // Append files using the key expected by multer (e.g., "files")
  memories.forEach((memory) => {
    formData.append('files', memory.file); // 👈 "files" matches multer field name
  });

  // Axios request
  try {
    const res = await axios.post(endpoints.MEMORY_CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    console.error('❌ Memory upload failed:', err.response?.data || err.message);
    throw err;
  }
};
