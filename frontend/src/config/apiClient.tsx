import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout:90000,
    timeoutErrorMessage: "Server timeout.......",
    headers:{
        "Content-Type": "application/json"
    },
    responseType: "json",
});

axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("authToken");    
   if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    })

axiosInstance.interceptors.response.use(
    (response) => {
        return (response.data);
    },
    (exceptation) => {
        throw exceptation?.response || {
            message: "Server Error",
        };
    }
    );

export default axiosInstance;