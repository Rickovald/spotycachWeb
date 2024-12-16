import axios from 'axios';

export const apiAddr = 'http://localhost:5001';

export const api = axios.create({
    baseURL: apiAddr, // URL вашего сервера
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// Перехватчик для добавления токена
api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Перехватчик для обработки ошибок
// api.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.response?.status === 401) {
//             localStorage.removeItem('accessToken');
//             // window.location = '/login';
//         }
//         return Promise.reject(error);
//     }
// );
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Если ошибка связана с истекшим токеном
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
);
export const setupTokenRefresh = (expiresIn: number) => {
    setTimeout(async () => {
        // Вызов API для обновления токена
        const newToken = await refreshAccessToken();
        localStorage.setItem('accessToken', newToken);
        // Перезапускаем таймер с новым временем действия
        setupTokenRefresh(expiresIn);
    }, (expiresIn - 60) * 1000); // Обновление за 1 минуту до истечения
};

const refreshAccessToken = async () => {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) {
        throw new Error('No refresh token found');
    }
    const response = await axios.post('/auth/refresh', {
        refreshToken: refresh
    });
    if (!response.data.accessToken) {
        throw new Error('Failed to refresh access token');
    }
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data.accessToken;
};