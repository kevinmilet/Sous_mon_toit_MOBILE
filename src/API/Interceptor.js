import axios from "axios";
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instanceAxios = axios.create({
    baseURL: API_URL,
    // baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

instanceAxios.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("@auth_token");
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instanceAxios.interceptors.response.use(
    (res) => {
        if (res.data.token) {
            AsyncStorage.setItem("@auth_token", res.data.token);
        }
        return res;
    },
    async (err) => {
        console.error("interceptor error", err);
        const originalConfig = err.config;

        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                AsyncStorage.removeItem("@auth_token");
                AsyncStorage.removeItem("@auth_userId");
                return err
            }
        }

        if (err.response.status === 403 && err.response.data) {
            AsyncStorage.removeItem("@auth_token");
            AsyncStorage.removeItem("@auth_userId");
        }

        return err
    }
);

export { instanceAxios };
