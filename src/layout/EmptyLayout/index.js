import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);

function EmptyLayout({ children }) {
    return <div className={cx('content')}>{children}</div>;
}

EmptyLayout.propTypes = {
    children: PropTypes.node.isRequired
};
export default EmptyLayout;
