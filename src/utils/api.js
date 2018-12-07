import {get, post} from './http'

const api = {
    //获取二维码
    getQrcode: () => {
        return get('/business/v1/login/imagecode')
    },
    //登录
    login: (data) => {
        return post('/business/v1/login/encrypt', data)
    },
    //获取菜单
    getMenu: () => {
        return get('/business/v1/roles/getMenuForPc')
    },
    //获取登录用户信息
    getUserInfo: () => {
        return get('/business/v1/users/details')
    },
    //获取项目树
    getTreeProject: () => {
       return get('/business/v1/tree?type=2')
    },
    //绩效考核-考核结果  获取:指标范围、选择方案
    searchRangeAndPlan: () => {
        return post('/newkpi/v1/Result/searchRangeAndPlan', null);
    },
    //绩效考核-考核结果  搜索
    searchList: (params) => {
        return post('/newkpi/v1/Result/list', params)
    }
};

export default api;