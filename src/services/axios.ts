import axios from 'axios';

export function useAxios(){
  const token = localStorage.getItem('chat_app_token');
  const defaultOptions = {
    withCredentials: true,
    baseURL: 'http://localhost:6789/api/v1/',
    headers: {
        Authorization: token ? token : '',
    },
  };
  return {
      get: (url: string, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
      post: (url: string, data: Record<string,any>, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
      put: (url: string, data: Record<string,any>, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
      delete: (url: string, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
  };
};


