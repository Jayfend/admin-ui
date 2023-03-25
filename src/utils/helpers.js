export const scrollToPosition = (top = 0) => {
    try {
        /**
         * Latest API
         */
        document.documentElement.scrollTo({
            top: top,
            left: 0,
            behavior: 'smooth'
        });
    } catch (_) {
        /**
         * Fallback
         */
        document.documentElement.scrollTo(0, top);
    }
};

export const uuid = () => {
    let dt = new Date().getTime();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
};

export function currencyFormat(value) {
    const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    return formatter.format(value);
}
