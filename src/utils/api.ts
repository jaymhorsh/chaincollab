// 'use server';
import axios from 'axios';
const api = axios.create({
  baseURL: 'https://livepeer.studio/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
  },
});
// api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`;
//   return config;
// });

export default api;
