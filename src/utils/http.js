import axios from 'axios'
import { message } from 'antd';
import {cookie} from './common';

axios.defaults.baseURL = 'http://140.143.151.190:890/api'; //api 地址
axios.defaults.withCredentials = true; //跨域允许传递 cookie
axios.defaults.timeout = 10000; // 请求超时

axios.interceptors.request.use( config => {
    config.headers["Content-Type"] = "application/json";
    config.headers["token"] = cookie.get('token');
    config.headers["source"] = "pc";
    return config;
})

axios.interceptors.response.use( response => {
    if (response.status >= 200 && response.status <= 300) {
        if(response.data.code >= 200 && response.data.code <= 200){
            return response.data;
        } else if(response.data.code === 401) {
            message.error(response.data.data, function () {
                // window.location.href = "http://localhost:3000"
            });
            return response.data;
        } else {
            message.error(response.data.data);
            return response.data;
        }
    } else {
        message.error(response.message);
    }
}, error => {
    // 对响应错误做点什么
    message.error(error.message);
    return Promise.reject(error);
})

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}