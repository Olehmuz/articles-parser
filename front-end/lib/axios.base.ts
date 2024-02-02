
import axios from 'axios';
import { getSession } from 'next-auth/react';

export const $axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_baseURL,
})

$axios.interceptors.request.use(async (config) => {
  const session = await getSession()
  config.headers['Authorization'] = `Bearer ${session?.user.accessToken}`;
  return config;
})