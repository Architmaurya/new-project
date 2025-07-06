import { endpoints } from './api';
import axios from 'axios';

// POST example
await axios.post(endpoints.BIRTHDAY_CREATE, {
  nickname,
  message,
  happyText,
  birthdayText
});
