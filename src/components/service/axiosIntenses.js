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

// Axios instance without interceptors for token verification
const tokenVerificationAxiosInstance = axios.create({
  baseURL: AUTH_URL,
});

const verifyToken = async (token) => {
  try {
    const response = await tokenVerificationAxiosInstance.get("/verify-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(
      "Token verification failed:",
      err.response?.data || err.message
    );
    return { error: err.response?.data || err.message };
  }
};

// Request interceptor for apiAxiosInstance
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
    }
    return Promise.reject(error);
  }
);

// Request interceptor for authAxiosInstance
authAxiosInstance.interceptors.request.use(
  async (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (config.url.includes("/signin") || config.url.includes("/signup")) {
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
    }
    return Promise.reject(error);
  }
);

export { apiAxiosInstance, authAxiosInstance };
