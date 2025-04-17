import axios from "axios";

const API_URL = "http://localhost:8000/token/"; // Adjust if using a deployed backend

// Function to log in and get access & refresh tokens
export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}`, { username, password });
  if (response.data.access) {
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
  }
  return response.data;
};

// Function to refresh token when it expires
export const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) throw new Error("No refresh token found");
  
  const response = await axios.post(`${API_URL}refresh/`, { refresh: refresh_token });
  if (response.data.access) {
    localStorage.setItem("access_token", response.data.access);
  }
  return response.data.access;
};

// Function to log out and remove tokens
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// Axios instance with token handling
export const apiClient = axios.create({
  baseURL: "http://localhost:8000", // Adjust as needed
});

// Request interceptor to add token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request", config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to refresh token if expired
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await refreshToken();
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(error.config); // Retry the failed request
      } catch (refreshError) {
        logout();
        window.location.href = "/login"; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);
