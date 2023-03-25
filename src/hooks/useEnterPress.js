const { useEffect } = require('react');

function useEnterPress(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                event.preventDefault();
                handler(event);
            }
        };
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, [handler, ref]);

    return useEnterPress;
}

export default useEnterPress;
