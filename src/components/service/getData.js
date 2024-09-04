import { apiAxiosInstance, authAxiosInstance } from "./axiosIntenses";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const getData = async (msg) => {
  try {
    const response = await apiAxiosInstance.get(
      `/query?message=${encodeURIComponent(msg)}`
    );
    return response.data;
  } catch (err) {
    console.error("Request failed:", err.response?.data || err.message);
    return { error: err.response?.data || err.message };
  }
};

export const retriveProducts = async (msg) => {
  const token = getToken();
  try {
    const response = await apiAxiosInstance.get(
      `/retrieve?query=${encodeURIComponent(msg)}`
    );
    return response.data;
  } catch (err) {
    console.error("Request failed:", err.response?.data || err.message);
    return { error: err.response?.data || err.message };
  }
};

export const getQueryData = async (ids, msg) => {
  const token = getToken();
  try {
    const response = await apiAxiosInstance.get(
      `/query?context=true&ids=${ids}&message=${msg}`
    );
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const getProductDetails = async (id) => {
  const token = getToken();
  try {
    const response = await authAxiosInstance.get(`/product?id=${id}`);
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const getCartDetails = async () => {
  const token = getToken();
  try {
    const response = await authAxiosInstance.get(`/cart`);
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const addCart = async (obj) => {
  const token = getToken();
  try {
    const response = await authAxiosInstance.post(`/cart/add`, {
      items: [obj],
    });
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const removeCart = async (obj) => {
  const token = getToken();
  try {
    const response = await authAxiosInstance.post(`/cart/remove`, obj);
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const getWhishlistDetails = async () => {
  const token = getToken();
  try {
    const response = await authAxiosInstance.get(`/wishlists`);
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};
export const addWishlist = async (name) => {
  const token = getToken();
  try {
    const response = await authAxiosInstance.post(`/wishlists`, {
      wishlist_name: name,
    });
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const deleteWishlist = async (id) => {
  const token = getToken();
  try {
    const response = await authAxiosInstance.delete(`/wishlists`, {
      data: {
        wishlist_id: id,
      },
    });
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const addWishlistItem = async (listId, prodId) => {
  const token = getToken();
  try {
    const response = await authAxiosInstance.post(`/wishlists/add`, {
      product_id: prodId,
      wishlist_id: listId,
    });
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};
export const removeWishlistItem = async (listId, prodId) => {
  const token = getToken();
  try {
    const response = await authAxiosInstance.post(`/wishlists/remove`, {
      product_id: prodId,
      wishlist_id: listId,
    });
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const getHistory = async () => {
  const token = getToken();
  try {
    const response = await authAxiosInstance.get(`/history`);
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const getAudioText = async (audio) => {
  const token = getToken();
  try {
    const response = await axios.post(
      `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/speech`,
      { file: audio },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};
