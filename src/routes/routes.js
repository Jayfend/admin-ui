import config from '../configs/index';

// Pages
import Login from '../pages/Login/index';
import Contact from 'pages/Contact/index';
import Dash from 'pages/Dashboard/dashboad';
import RecentOrders from 'pages/RecentOrders/index';
// User
import User from 'pages/userList/index';
import NewUser from 'pages/UserNew/index';
import EditUser from 'pages/UserEdit/index';
import UserRole from 'pages/UserRole/index';
import UserProfile from 'pages/userProfile/index';
// Game
import Game from 'pages/gameList/index';
import NewGame from 'pages/GameNew/index';
import EditGame from 'pages/GameEdit/index';
import ProfileGame from 'pages/GameProfile/index';
import GameGenre from 'pages/GameGenre/index';
// Genre
import GameGenreEdit from 'pages/GenreEdit/index';
import GameNewGenre from 'pages/GenreNew/index';
import GenreList from 'pages/GenreList/index';
//Publisher
import PublisherNew from 'pages/PublisherNew/index';
import PublisherView from 'pages/PublisherView/index';
import PublisherEdit from 'pages/PublisherEdit/index';

const adminRoutes = [
    { path: config.routes.dashboard, component: Dash },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.recentOrders, component: RecentOrders },
    // Game
    { path: config.routes.listGame, component: Game },
    { path: config.routes.newGame, component: NewGame },
    { path: config.routes.editGame, component: EditGame },
    { path: config.routes.profileGame, component: ProfileGame },
    { path: config.routes.genreGame, component: GameGenre },
    // Genre
    { path: config.routes.newGenre, component: GameNewGenre },
    { path: config.routes.listGenre, component: GenreList },
    { path: config.routes.genreEdit, component: GameGenreEdit },
    // User
    { path: config.routes.user, component: User },
    { path: config.routes.newUser, component: NewUser },
    { path: config.routes.editUser, component: EditUser },
    { path: config.routes.userRole, component: UserRole },
    { path: config.routes.userProfile, component: UserProfile },
    //Publisher
    { path: config.routes.newPublisher, component: PublisherNew },
    { path: config.routes.listPublisher, component: PublisherView },
    { path: config.routes.publisherEdit, component: PublisherEdit }
];

const authRoutes = [{ path: config.routes.login, component: Login }];

export { adminRoutes, authRoutes };
