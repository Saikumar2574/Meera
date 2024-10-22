import { store } from "../../lib/redux/store";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;

// Axios instance for general API requests
const apiAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Axios instance for authentication-related requests
const authAxiosInstance = axios.create({
  baseURL: AUTH_URL,
});

// Get token from Redux store
const getTokenFromRedux = () => {
  const state = store.getState(); // Access the Redux store
  return state.auth.token; // Assuming your token is in the auth slice
};

// Request interceptor for apiAxiosInstance
apiAxiosInstance.interceptors.request.use(
  async (config) => {
    const token = getTokenFromRedux(); 
    if (config.url.includes("/signin") || config.url.includes("/signup") || config.url.includes("/categories")) {
      return config;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for apiAxiosInstance
apiAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      store.dispatch({ type: 'auth/logout' }); // Dispatch a logout action if token is invalid
      alert("Session expired or invalid token. Please log in again.");
      return;
    }
    return Promise.reject(error);
  }
);

// Request interceptor for authAxiosInstance
authAxiosInstance.interceptors.request.use(
  async (config) => {
    const token = getTokenFromRedux(); // Get token from Redux
    if (config.url.includes("/signin") || config.url.includes("/signup") || config.url.includes("/categories")) {
      return config;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for authAxiosInstance
authAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      store.dispatch({ type: 'auth/logout' }); // Dispatch logout action
      alert("Session expired or invalid token. Please log in again.");
      return;
    }
    return Promise.reject(error);
  }
);

export { apiAxiosInstance, authAxiosInstance };
