import {get, post} from './http'

const api = {
    getQrcode: () => {
        return get('/business/v1/login/imagecode')
    },
    login: (userName, passWord, capText) => {
        return post('/business/v1/login/encrypt')
    },
    getMenu: () => {
        return get('/business/v1/roles/getMenuForPc')
    }
};

export default api;