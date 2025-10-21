import axios from 'axios';
import API_PATHS from './apiPaths';

const axiosInstance = axios.create({
    baseURL: API_PATHS.BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

// request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401 && !error.config.url.includes('/api/profile')) {
                window.location.href = '/';
            } else if (error.response.status === 500) {
                console.log("Server Error");
            }
        } else if (error.code === 'ECONNABORTED') {
            console.log("Request timeout");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
