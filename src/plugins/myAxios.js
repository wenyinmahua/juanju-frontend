import axios from 'axios';
import {showFailToast, showSuccessToast} from "vant";
import router from "../router/index.js";

const isDev = process.env.NODE_ENV === "development";
const instance = axios.create({
    baseURL: isDev ?'http://localhost:8080/api' : 'http://139.199.168.219:8080/api',
    // withCredentials: true，允许 cookie 跨域
    withCredentials: true
});
let token = localStorage.getItem('token');
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    if (token) {
        config.headers['authorization'] = token
    }
    return config;
}, function (error) {
      return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    const result = response.data;
    if(response.data.code === 40100){
        showFailToast(result.description ? result.description : result.message )
        // showFailToast(response.data.description);
        router.push("/login")

    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance