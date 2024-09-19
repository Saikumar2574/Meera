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


apiAxiosInstance.interceptors.request.use(
  async (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      //   const verificationResult = await verifyToken(token);
      //   if (verificationResult.error) {
      //     alert("Session expired or invalid token. Please log in again.");
      //     localStorage.removeItem("token");
      //     return Promise.reject(new Error("Token verification failed."));
      //   } else {
      config.headers.Authorization = `Bearer ${token}`;
      //   }
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
      localStorage.removeItem("token");
      alert("Session expired or invalid token. Please log in again.");
      return;
    }
    return Promise.reject(error);
  }
);

// Request interceptor for authAxiosInstance
authAxiosInstance.interceptors.request.use(
  async (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (config.url.includes("/signin") || config.url.includes("/signup") || config.url.includes("/categories")) {
      return config;
    }

    if (token) {
      //   const verificationResult = await verifyToken(token);
      //   if (verificationResult.error) {
      //     alert("Session expired or invalid token. Please log in again.");
      //     localStorage.removeItem("token");
      //     return Promise.reject(new Error("Token verification failed."));
      //   } else {
      config.headers.Authorization = `Bearer ${token}`;
      //   }
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
      localStorage.removeItem("token");
      alert("Session expired or invalid token. Please log in again.");
      return;
    }
    return Promise.reject(error);
  }
);

export { apiAxiosInstance, authAxiosInstance };
