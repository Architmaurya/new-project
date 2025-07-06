const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const endpoints = {
  BIRTHDAY_CREATE: `${BASE_URL}/birthday`,
  BIRTHDAY_TIME:`${BASE_URL}/time/timeline/create`,
  BIRTHDAY_GETWISHE: (id) => `${BASE_URL}/birthday/${id}`,
  MEMORY_CREATE: `${BASE_URL}/memory/create`,
 MEMORY_GET: (birthdayId) => `${BASE_URL}/memory/${birthdayId}`,
};
