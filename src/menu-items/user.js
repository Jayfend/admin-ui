// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';

// icons
const icons = {
    AiOutlineUserAdd,
    AiOutlineUser
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const user = {
    id: 'user',
    title: 'Tài khoản',
    type: 'group',
    children: [
        {
            id: 'user-list',
            title: 'Danh sách tài khoản',
            type: 'item',
            url: '/user',
            icon: icons.AiOutlineUser,
            breadcrumbs: false
        },
        {
            id: 'new-user',
            title: 'Thêm tài khoản mới',
            type: 'item',
            url: '/new-user',
            icon: icons.AiOutlineUserAdd,
            breadcrumbs: false
        }
    ]
};

export default user;
