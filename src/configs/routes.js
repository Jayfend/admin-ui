const routes = {
    //
    dashboard: '/',
    testApi: '/api',
    login: '/login',
    recentOrders: 'recent-orders',
    // Game
    listGame: '/list-game',
    newGame: '/new-game',
    editGame: '/edit-game/:id',
    profileGame: '/game-profile/:id',
    genreGame: '/edit-game-genre/:id',
    // Genre
    newGenre: '/new-genre',
    listGenre: '/list-genre',
    genreEdit: '/edit-genre/:id',

    // User
    user: '/user',
    editUser: '/edit-user/:id',
    userProfile: '/user-profile/:id',
    newUser: '/new-user',
    userRole: '/edit-user-role/:id',
    // Client
    contact: 'contact',
    signup: '/register',
    forgetPassword: '/forgetpassword'
};

export default routes;
