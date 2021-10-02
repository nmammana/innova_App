import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import Exercises from './pages/Exercises';
import Users from './pages/Users';
import Routines from './pages/Routines';
import './styles/Global.scss';
import './styles/Reset.scss';
import UsersContextProvider from './contexts/UsersContext';
import CategoriesContextProvider from './contexts/CategoriesContext'
import ExercisesContextProvider from './contexts/ExercisesContext'
import RoutinesContextProvider from './contexts/RoutinesContext';
import AuthContextProvider from './contexts/AuthContext';


export default function App() {
    return (
        <>  
            <AuthContextProvider>
            <UsersContextProvider> 
            <CategoriesContextProvider>
            <ExercisesContextProvider>  
            <RoutinesContextProvider> 
                <BrowserRouter>
                    <Switch>
                        <Route exact path= "/" component={Home}/>
                        <Route exact path="/users" component={Users} />
                        <Route exact path="/exercises" component={Exercises}/>
                        <Route exact path="/routines" component={Routines} />
                        <Route component={Error404}/>
                    </Switch>
                </BrowserRouter>
            </RoutinesContextProvider>
            </ExercisesContextProvider>
            </CategoriesContextProvider>
            </UsersContextProvider>
            </AuthContextProvider>
        </>
    )
}
