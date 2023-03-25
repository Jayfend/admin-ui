function useNotification(ref) {
    const addToast = (mode, message = '') => {
        if (message === '') {
            message = 'Message';
        }
        ref.current.addMessage({ mode: mode, message: message });
    };
    return addToast;
}

export default useNotification;
