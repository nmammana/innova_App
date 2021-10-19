import React from 'react'

import { Suspense } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Exercises from './pages/Exercises';
import Users from './pages/Users';
import Routines from './pages/Routines';
import RoutineDetails from './pages/RoutineDetails'

import './styles/Global.scss';
import './styles/Reset.scss';

import UsersContextProvider from './contexts/UsersContext';
import CategoriesContextProvider from './contexts/CategoriesContext'
import ExercisesContextProvider from './contexts/ExercisesContext'
import RoutinesContextProvider from './contexts/RoutinesContext';
import AuthContextProvider from './contexts/AuthContext';

import Loading from './components/Loading/Loading';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';


export default function App() {

    return (
        <>  
            <AuthContextProvider>
            <UsersContextProvider> 
            <CategoriesContextProvider>
            <ExercisesContextProvider>  
            <RoutinesContextProvider> 
                <BrowserRouter>
                    <Suspense fallback={<Loading />}> 
                        <Switch> 
                            <PublicRoute exact path="/login" component={Login}/>
                            <PrivateRoute exact path="/" component={Home}/>
                            <PrivateRoute exact path="/users" component={Users} />
                            <PrivateRoute exact path="/exercises" component={Exercises}/>
                            <PrivateRoute exact path="/routines" component={Routines} />
                            <Route exact path="/routines/:routineId" component={RoutineDetails}/>
                            <Route path="*" component={Error404}/>
                        </Switch>
                    </Suspense>
                </BrowserRouter> 
            </RoutinesContextProvider>
            </ExercisesContextProvider>
            </CategoriesContextProvider>
            </UsersContextProvider>
            </AuthContextProvider>
        </>
    )
}
