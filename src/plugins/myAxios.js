import axios from 'axios';
import {showFailToast, showSuccessToast} from "vant";
import router from "../router/index.js";

const isDev = process.env.NODE_ENV === "development";
const instance = axios.create({
    baseURL: isDev ?'http://localhost:8080/api' : '线上环境',
    // withCredentials: true，允许 cookie 跨域
    withCredentials: true
});
let token = sessionStorage.getItem('token');
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    console.log("我要发送请求啦。。。。",config)
    // 在发送请求之前做些什么
    if (token) {
        config.headers['authorization'] = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
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