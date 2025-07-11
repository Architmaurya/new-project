const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const endpoints = {
  BIRTHDAY_CREATE: `${BASE_URL}/birthday`,
  
  BIRTHDAY_GETWISHE: (id) => `${BASE_URL}/birthday/${id}`,
  MEMORY_CREATE: `${BASE_URL}/memory/memories`,
 MEMORY_GET: (birthdayId) => `${BASE_URL}/memory/${birthdayId}`,
 BIRTHDAY_TIME:`${BASE_URL}/timelime/timelinecreate`,

 GET_TIMELINE_BY_ID: (birthdayId) => `${BASE_URL}/timelime/${birthdayId}`,
};
