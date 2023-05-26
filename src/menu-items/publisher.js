import { GrAddCircle, GrUnorderedList } from 'react-icons/gr';

// icons
const icons = {
    GrAddCircle,
    GrUnorderedList
};
// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const publisher = {
    id: 'publisher',
    title: 'Nhà phát trò chơi',
    type: 'group',
    children: [
        {
            id: 'list-publisher',
            title: 'Danh sách Nhà phát hành',
            type: 'item',
            url: '/list-publisher',
            icon: icons.GrUnorderedList,
            breadcrumbs: false
        },
        {
            id: 'new-publisher',
            title: 'Thêm Nhà phát hành mới',
            type: 'item',
            url: '/new-publisher',
            icon: icons.GrAddCircle,
            breadcrumbs: false
        }
    ]
};

export default publisher;
