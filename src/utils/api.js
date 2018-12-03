import {get, post} from './http'

const api = {
    getQrcode: () => {
        return get('/business/v1/login/imagecode')
    },
    login: (data) => {
        return post('/business/v1/login/encrypt', data)
    },
    getMenu: () => {
        return get('/business/v1/roles/getMenuForPc')
    }
};

export default api;