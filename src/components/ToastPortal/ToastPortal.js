import classNames from 'classnames/bind';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { useToastPortal, useToastAutoClose } from 'hooks';
import ReactDOM from 'react-dom';

import { uuid } from 'utils/index';
import Toast from '../ToastPortal/Toast/index';
import styles from './ToastPortal.module.scss';
const cx = classNames.bind(styles);

const ToastPortal = forwardRef(({ autoClose = false, autoCloseTime = 3000 }, ref) => {
    const [toasts, setToasts] = useState([]);
    const { loaded, portalId } = useToastPortal();

    useToastAutoClose({
        toasts,
        setToasts,
        autoClose,
        autoCloseTime
    });

    const removeToast = (id) => {
        setToasts(toasts.filter((t) => t.id !== id));
    };

    useImperativeHandle(ref, () => ({
        addMessage(toast) {
            // Limit the number of toast
            if (toasts.length < 3) {
                setToasts([...toasts, { ...toast, id: uuid() }]);
            }
        }
    }));

    return loaded ? (
        ReactDOM.createPortal(
            <div className={cx('toast-container')}>
                {toasts.map((t) => (
                    <Toast key={t.id} mode={t.mode} message={t.message} onClose={() => removeToast(t.id)} />
                ))}
            </div>,

            document.getElementById(portalId)
        )
    ) : (
        <></>
    );
});

export default ToastPortal;
