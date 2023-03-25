import { Fragment, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { adminRoutes, authRoutes } from 'routes/routes';
import EmptyLayout from 'layout/EmptyLayout/index';
import MainLayout from 'layout/MainLayout/index';

import { scrollToPosition } from 'utils';
import config from 'configs/index';

import * as authServices from 'services/authServices';

// import Routes from 'routes';
import ThemeCustomization from 'themes/index';

function App() {
    let location = useLocation();
    useEffect(() => {
        scrollToPosition(0);
    }, [location.pathname]);

    return (
        <>
            <div className="App">
                <>
                    <Routes>
                        {authRoutes.map((route, index) => {
                            const Page = route.component;
                            const isLoggedIn = authServices.isLoggedIn();
                            let Layout = EmptyLayout;
                            // Login rồi không vào trang Login, Sign Up, Forget Password được nữa
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        isLoggedIn ? (
                                            <Navigate to={config.routes.dashboard} replace={true} />
                                        ) : (
                                            <ThemeCustomization>
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            </ThemeCustomization>
                                        )
                                    }
                                />
                            );
                        })}
                        {adminRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = MainLayout;
                            const isLoggedIn = authServices.isLoggedIn();
                            // Chưa Loggin thì không vào được
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        isLoggedIn ? (
                                            <ThemeCustomization>
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            </ThemeCustomization>
                                        ) : (
                                            <Navigate to={config.routes.login} replace={true} />
                                        )
                                    }
                                />
                            );
                        })}
                    </Routes>
                </>
            </div>
        </>
    );
}
export default App;
