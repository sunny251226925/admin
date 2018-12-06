
export const cookie = {
    put: (key,value) => {
        sessionStorage.setItem(key,value);
    },
    get: (key) => {
        return sessionStorage.getItem(key);
    },
    remove: (key) => {
        sessionStorage.removeItem(key);
    },
    clear: () => {
        sessionStorage.clear();
    }
}