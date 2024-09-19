
import { authAxiosInstance } from "./axiosIntenses";


export const login = async (credentials) => {
  try {
    const response = await authAxiosInstance.post("/signin", {
      username: credentials.email,
      password: credentials.password,
    });

    // Check if the response has a token and store it
    if (response.data.token && typeof window !== "undefined") {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (err) {
    console.error(err.message);
    throw new Error("Failed to login");
  }
};

export const signUp = async (credentials) => {
  try {
    const response = await authAxiosInstance.post("/signup", {
      username: credentials.email,
      email: credentials.email,
      password: credentials.password,
      meta: {},
    });

    // Check if the response has a token and store it
    if (response.data.token && typeof window !== "undefined") {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (err) {
    console.error(err.message);
    throw new Error("Failed to signup");
  }
};
