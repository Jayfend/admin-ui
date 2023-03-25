import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = ({ children }) => (
    <>
        <Outlet />
        <div>{children}</div>
    </>
);

MinimalLayout.propTypes = {
    children: PropTypes.node.isRequired
};
export default MinimalLayout;
