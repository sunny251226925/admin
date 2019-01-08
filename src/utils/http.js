import axios from 'axios'
import { message } from 'antd';
import { cookie } from './common';
axios.defaults.baseURL = 'https://cloud.qhse.cn/api'; //api 地址
axios.defaults.withCredentials = true; //跨域允许传递 cookie
axios.defaults.timeout = 10000; // 请求超时

axios.interceptors.request.use( config => {
    const whiteList = [
        '/business/v1/login/imagecode',
        '/business/v1/login/encrypt'
    ];
    if(whiteList.includes(config.url)){
        delete config.headers["CPSP_BACK_USER_TOKEN"];
    } else {
        config.headers["Content-Type"] = "application/json";
        config.headers["token"] = cookie.get('token');
        config.headers["source"] = "pc";
    }
    return config;
})

axios.interceptors.response.use( response => {
    if (response.status >= 200 && response.status <= 300) {
        if(response.data.code >= 200 && response.data.code <= 200){
            return response.data;
        } else if(response.data.code === 401) {
            message.destroy();
            // message.error(response.data.data, 1, function () {
            //     window.location.href = '/login';
            //     cookie.clear();
            // });
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
            if(res){
                resolve(res.data)
            } else {
                resolve(res);
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            if(res){
                resolve(res.data)
            } else {
                resolve(res);
            }
        }).catch(err => {
            reject(err)
        })
    })
}