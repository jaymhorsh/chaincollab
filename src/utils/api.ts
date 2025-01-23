import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Utility function to handle GET requests
export const get = async (url: string, token?: string) => {
  const response = await api.get(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return response.data;
};

// Utility function to handle POST requests
export const post = async (url: string, data: any, token?: string) => {
  const response = await api.post(url, data, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return response.data;
};

// Utility function to handle PUT requests
export const put = async (url: string, data: any, token?: string) => {
  const response = await api.put(url, data, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return response.data;
};

// Utility function to handle DELETE requests
export const del = async (url: string, token?: string) => {
  const response = await api.delete(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return response.data;
};

export default api;
