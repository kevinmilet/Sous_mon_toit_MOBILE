import axios from "axios";
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instanceAxios = axios.create({
    baseURL: API_URL,
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
            console.log('j\'ai set le token')
        }
        return res;
    },
    async (err) => {
        console.log("interceptor error",err);
        const originalConfig = err.config;

        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                AsyncStorage.removeItem("@auth_token");
                AsyncStorage.removeItem("@auth_userId");
                console.log('j\ai supprimé le token')
            }
        }

        if (err.response.status === 403 && err.response.data) {
            console.log("403");
            AsyncStorage.removeItem("@auth_token");
            AsyncStorage.removeItem("@auth_userId");
            console.log('j\ai supprimé le token')
        }
    }
);

export { instanceAxios };