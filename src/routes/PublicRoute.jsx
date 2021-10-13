import React, { useContext, useEffect } from 'react'
import {
    Route,
    Redirect
  } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';


export default function PublicRoute({ component: RouteComponent, ...rest }) {
    const {currentUser} = useContext(AuthContext);

    /* useEffect(() => {
        console.log('public',currentUser)
    }, [])
 */
    return (
        <Route
            {...rest}
            render={routeProps =>
                !currentUser ? (
                    <RouteComponent {...routeProps}/>
                ):(
                    <Redirect to={"/"}/>
                )
            }
        />
    )
}
