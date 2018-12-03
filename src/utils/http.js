import axios from 'axios'
import { message } from 'antd';
import { browserHistory } from 'react-router'
axios.defaults.baseURL = 'http://140.143.151.190:890/api'; //api 地址
axios.defaults.withCredentials = true; //跨域允许传递 cookie
axios.defaults.timeout = 10000; // 请求超时

axios.interceptors.request.use( config => {
    config.headers["Content-Type"] = "application/json";
    config.headers["token"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDQ0MTE5OTQ2MDUsInBheWxvYWQiOiJcIjI2MzAxNDE4NTk3MjI3MzE1MlwiIn0.bgOigPdCqAGxFjLzsB3kq_w0zVQuoydvuai-3_DTf1M";
    config.headers["source"] = "pc";
    return config;
})

axios.interceptors.response.use(response => {
    if (response.status >= 200 && response.status <= 300) {
        if(response.data.code >= 200 && response.data.code <= 200){
            return response.data;
        } else if(response.data.code === 401) {
            message.error(response.data.data, function () {
                browserHistory.push('/');
            });
            return null;
        } else {
            message.error(response.data.data);
            return null;
        }
    } else {
        // 报错
        message.error(response.data.message);
    }
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
        axios.post(url, {
            data: data
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}