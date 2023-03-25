// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { BsMailbox } from 'react-icons/bs';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    BsMailbox,
    RiMoneyDollarCircleLine
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'contact',

    title: 'Thống kê',

    type: 'group',
    children: [
        {
            id: 'contact',
            title: 'Phản hồi từ khách hàng',
            type: 'item',
            url: '/contact',
            icon: icons.BsMailbox,
            breadcrumbs: false
        },
        {
            id: 'recentOrders',
            title: 'Danh sách hóa đơn',
            type: 'item',
            url: '/recent-orders',
            icon: icons.RiMoneyDollarCircleLine,
            breadcrumbs: false
        }
    ]
};

export default pages;
