import { GrGamepad, GrAddCircle } from 'react-icons/gr';

// icons
const icons = {
    GrGamepad,
    GrAddCircle
};
// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const game = {
    id: 'game',
    title: 'Game',
    type: 'group',
    children: [
        {
            id: 'list-game',
            title: 'Danh sách trò chơi',
            type: 'item',
            url: '/list-game',
            icon: icons.GrGamepad,
            breadcrumbs: false
        },
        {
            id: 'new-game',
            title: 'Thêm trò chơi mới',
            type: 'item',
            url: '/new-game',
            icon: icons.GrAddCircle,
            breadcrumbs: false
        }
    ]
};

export default game;
