import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/404';
import Exercises from '../pages/Exercises';
import Users from '../pages/Users';
import Rutines from '../pages/Rutines';
import '../styles/Global.scss';


export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path= "/" component={Home}/>
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/exercises" component={Exercises}/>
                    <Route exact path="/new" component={Rutines} />
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
