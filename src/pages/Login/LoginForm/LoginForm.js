import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as authServices from 'services/authServices';
import * as userServices from 'services/userServices';
import ToastPortal from 'components/ToastPortal';
import config from 'configs/index';
import styles from './LoginForm.module.scss';
import Cookies from 'js-cookie';
import { useNotification } from 'hooks';
import useEnterPress from 'hooks/useEnterPress';

const cx = classNames.bind(styles);

function LoginForm() {
    const navigate = useNavigate();
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loading, setLoading] = useState(false);
    const toastRef = useRef();
    const buttonRef = useRef();
    const Notify = useNotification(toastRef);

    // var mediumRegex = new RegExp(
    //   '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
    // );

    const login = async () => {
        setLoading(true);
        // Make Api call
        const response = await authServices.login({
            userName: usernameInput,
            password: passwordInput,
            rememberMe: false
        });

        if (response.isSuccess === false) {
            setLoading(false);
            Notify('error', response.message);
        }

        if (response.isSuccess === true) {
            const profileApi = async () => {
                const result = await userServices.getUserProfile(response.resultObj.userId);
                if (result.resultObj.roles[0] === 'admin' || result.resultObj.roles[1] === 'admin') {
                    Cookies.set('jwt-admin', response.resultObj.token, { expires: 30 / 1440, secure: true });
                    Cookies.set('admin-id', response.resultObj.userId, { expires: 30 / 1440, secure: true });
                    Notify('success', 'Đăng nhập thành công');
                    const timerId = setTimeout(() => {
                        clearTimeout(timerId);
                        setLoading(false);
                        navigate(config.routes.dashboard, { replace: true });
                    }, 2000);
                } else {
                    setLoading(false);
                    Notify('error', 'Không phải tài khoản Admin');
                }
            };
            profileApi();
        }
    };

    const handleClick = () => {
        var msg = '';
        if (usernameInput === '') {
            msg = 'Hãy điền tên đăng nhập';
            if (passwordInput === '') {
                msg = 'Hãy điền tên đăng nhập và mật khẩu';
            }
            Notify('warning', msg);
            return;
        }
        if (passwordInput === '') {
            msg = 'Hãy điền mật khẩu';
            Notify('warning', msg);
            return;
        }
        if (passwordInput.length < 6) {
            msg = 'Mật khẩu phải ít nhất 6 ký tự';
            Notify('warning', msg);
            return;
        }

        login();
    };

    useEnterPress(buttonRef, handleClick);

    return (
        <>
            <div>
                {/* <div className={cx('title')}>LOGIN</div> */}
                <div className={cx('container')}>
                    <>
                        <span className={cx('username-label')}>Tên đăng nhập</span>
                        <input
                            className={cx('username-input')}
                            type="text"
                            placeholder="Enter your username"
                            value={usernameInput}
                            onChange={(e) => {
                                setUsernameInput(e.currentTarget.value);
                            }}
                        />
                    </>
                    <>
                        <span className={cx('password-label')}>Mật khẩu</span>
                        <input
                            className={cx('password-input')}
                            type="password"
                            placeholder="Password"
                            value={passwordInput}
                            onChange={(e) => {
                                setPasswordInput(e.currentTarget.value);
                            }}
                        />
                        <span className={cx('password-label')}></span>
                        <span className={cx('password-label')}></span>
                        <span className={cx('password-label')}></span>
                    </>
                    {loading ? (
                        <div className={cx('loading')}>
                            <span></span>
                        </div>
                    ) : (
                        <button className={cx('button')} onClick={handleClick}>
                            Đăng nhập
                        </button>
                    )}
                    {/* <Link to={config.routes.forgetPassword} className={cx('link')} ref={buttonRef}>
                        Quên mật khẩu ?
                    </Link> */}
                </div>
            </div>
            <ToastPortal ref={toastRef} autoClose={true} />
        </>
    );
}

export default LoginForm;
