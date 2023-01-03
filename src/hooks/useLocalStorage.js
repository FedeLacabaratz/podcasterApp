
/**
 * 
 * @param {String} key Nombre del key en localStorage
 * @param {Array} value Valor a setear en localStorage
 * @param {String} ttl (Time to Live) tiempo de expiración de lo que se guarde en localStorage (24h = 86400000ms)
 */
export const setPodcastsWithExpiry = (key, value, ttl=86400000) => {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

/**
 * 
 * @param {String} key Nombre del key en localStorage
 */
export const getPodcastsWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return [];
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return [];
    }
    return item.value;
}