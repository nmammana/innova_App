/* import React from 'react'

import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './Routes'; // Private Route list
import Loading from '../components/Loading/Loading';

export default function ProtectedRoutes() {
    return (
        <Switch>
            <Suspense
                fallback={<Loading/>}
            >
                {routes.map(({ component: Component, path, exact }) => (
                    <Route
                        path={`/${path}`}
                        key={path}
                        exact={exact}
                    >
                        <Component />
                    </Route>
                ))}
            </Suspense>
        </Switch>
    )
} */
