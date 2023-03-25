import { GrAddCircle, GrUnorderedList } from 'react-icons/gr';

// icons
const icons = {
    GrAddCircle,
    GrUnorderedList
};
// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const genre = {
    id: 'genre',
    title: 'Thể loại trò chơi',
    type: 'group',
    children: [
        {
            id: 'list-genre',
            title: 'Danh sách thể loại',
            type: 'item',
            url: '/list-genre',
            icon: icons.GrUnorderedList,
            breadcrumbs: false
        },
        {
            id: 'new-genre',
            title: 'Thêm thể loại mới',
            type: 'item',
            url: '/new-genre',
            icon: icons.GrAddCircle,
            breadcrumbs: false
        }
    ]
};

export default genre;
