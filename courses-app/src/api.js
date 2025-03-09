import axios from "axios";
import Cookies from "js-cookie";
const api = axios.create({ baseURL: "http://127.0.0.1:8000/api" });
// Middleware: Thêm token vào header của mọi request
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
// Middleware: Xử lý lỗi toàn cục
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             Cookies.remove("token");
//             window.location.href = "/sign-in"; // Chuyển hướng về đăng nhập
//         }
//         return Promise.reject(error);
//     }
// );

export default api;
