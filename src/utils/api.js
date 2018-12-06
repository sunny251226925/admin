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
    }
};

export default api;