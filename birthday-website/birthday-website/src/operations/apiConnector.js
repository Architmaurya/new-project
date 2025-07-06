import axios from 'axios';

export const apiConnector = async (method, url, body = {}, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data: body,
      headers,
    });
    return response;
  } catch (error) {
    console.error('API Connector Error:', error);
    throw error;
  }
};
