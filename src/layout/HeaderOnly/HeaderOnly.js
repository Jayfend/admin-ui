import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Header from 'layouts/components/Header';
import Footer from 'layouts/components/Footer';
import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);
function HeaderOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

HeaderOnly.propTypes = {
    children: PropTypes.node.isRequired
};
export default HeaderOnly;
