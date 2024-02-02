import axios from 'axios';
import {showFailToast, showSuccessToast} from "vant";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    // withCredentials: true
    withCredentials: true
});
// instance.defaults.withCredentials = true;
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    console.log("我要发送请求啦。。。。",config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log("我收到你的响应啦。。。。",response)
    // const result = response.data;
    if(response.data.code !== 0){
        showFailToast(response.message)
        showFailToast(response.description);
    }
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance