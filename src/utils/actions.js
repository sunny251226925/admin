export const USERINFO = 'USERINFO';
export const TOKEN = 'TOKEN';

export function setUser(login) {
    return {type: USERINFO, login}
}
export function setToken(login) {
    return {type: TOKEN, login}
}