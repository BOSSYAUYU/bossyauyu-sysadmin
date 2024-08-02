import axios from 'axios';
import { message } from 'antd';

export const request = axios.create({
  baseURL: '/',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  withCredentials: true,
  method: 'post',
});

request.interceptors.response.use(
  (response) => {
    if (response.data?.status !== 10000) {
      switch (response.data?.status) {
        case 20005:
          window.location.href = '/login';
          break;
      }
      message.error(response.data?.message ?? '发生错误，请重试');
      return Promise.reject();
    }
    return response.data;
  },
  async (error) => {
    let msg = '';
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = '/login';
          break;
        default:
          if (error.response?.config?.responseType === 'blob') {
            msg = await error.response.data?.text();
            msg = JSON.parse(msg)?.message;
          } else {
            msg = error.response.data?.message;
          }
          msg = msg || '请求失败，请重试';
      }
    }
    message.error(msg);
    return Promise.reject();
  }
);

request.interceptors.request.use((config) => {
  if (config.headers['Content-Type'] === 'application/json;charset=utf-8') {
    config.data = {
      ...(config.data ?? {}),
      token: localStorage.getItem('token') ?? '',
      accountId: localStorage.getItem('accountId') ?? '',
    };
  }
  return config;
});
