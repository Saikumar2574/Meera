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

export const recommendedProducts = async (data) => {
  // const token = getToken();
  try {
    const response = await apiAxiosInstance.post(`/products/recommendations`, data);
    return response.data;
  } catch (err) {
    console.error("Request failed:", err.response?.data || err.message);
    return { error: err.response?.data || err.message };
  }
};

export const retriveProducts = async (page, data) => {
  // const token = getToken();
  try {
    const response = await authAxiosInstance.post(
      `/products/search/relevance?page=${page}&page_size=20`,
      data
    );
    return response.data;
  } catch (err) {
    console.error("Request failed:", err.response?.data || err.message);
    return { error: err.response?.data || err.message };
  }
};

export const getQueryData = async (ids, msg) => {
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
  try {
    const response = await authAxiosInstance.get(`/products/search?id=${id}`);
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const getCartDetails = async () => {
  try {
    const response = await authAxiosInstance.get(`/cart`);
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const addCart = async (obj) => {
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
  try {
    const response = await authAxiosInstance.post(`/cart/remove`, obj);
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const getWhishlistDetails = async () => {
  try {
    const response = await authAxiosInstance.get(`/wishlists`);
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};
export const addWishlist = async (name) => {
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

//store api's

export const getParentCategories = async () => {
  try {
    const response = await authAxiosInstance.get(`/categories`);
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};

export const getChildCategories = async (id) => {
  try {
    const response = await authAxiosInstance.get(
      `/categories?category_id=${id}&category_type=child&page=1&per_page=2`
    );
    return response.data;
  } catch (err) {
    return { error: err.response?.data || err.message };
  }
};
