import classNames from 'classnames/bind';
import { FaCheckCircle, FaRegTimesCircle, FaExclamationCircle } from 'react-icons/fa';

import styles from './Toast.module.scss';
const cx = classNames.bind(styles);

function Toast({ mode, onClose, message }) {
    switch (mode) {
        case 'success':
            return (
                <>
                    <div onClick={onClose} className={cx('toast', 'success')}>
                        <div className={cx('icon')}>
                            <FaCheckCircle />
                        </div>
                        <div className={cx('message')}>{message}</div>
                        <span className={cx('countdown')}></span>
                    </div>
                </>
            );
        case 'error':
            return (
                <>
                    <div onClick={onClose} className={cx('toast', 'error')}>
                        <div className={cx('icon')}>
                            <FaRegTimesCircle />{' '}
                        </div>
                        <div className={cx('message')}>{message}</div>
                        <span className={cx('countdown')}></span>
                    </div>
                </>
            );
        case 'warning':
            return (
                <>
                    <div onClick={onClose} className={cx('toast', 'warning')}>
                        <div className={cx('icon')}>
                            <FaExclamationCircle />
                        </div>
                        <div className={cx('message')}>{message}</div>
                        <span className={cx('countdown')}></span>
                    </div>
                </>
            );
        default:
            return (
                <>
                    <div onClick={onClose} className={cx('toast', 'success')}>
                        <div className={cx('icon')}>
                            <FaCheckCircle />
                        </div>
                        <div className={cx('message')}>{message}</div>
                        <span className={cx('countdown')}></span>
                    </div>
                </>
            );
    }
}

export default Toast;
