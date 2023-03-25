import { uuid } from '../utils';
import { useState, useEffect } from 'react';

function useToastPortal() {
    const [loaded, setLoaded] = useState(false);
    const [portalId] = useState(`toast-portal-${uuid()}`);

    useEffect(() => {
        const div = document.createElement('div');
        div.id = portalId;
        div.style = 'position: fixed; bottom: 10px; right: 10px; z-index: 10';
        document.getElementsByTagName('body')[0].prepend(div);

        setLoaded(true);

        return () => document.getElementsByTagName('body')[0].removeChild(div);
    }, [portalId]);
    return { loaded, portalId };
}

export default useToastPortal;
