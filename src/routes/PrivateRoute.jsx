import React, { useContext, useEffect } from 'react'
import {
    Route,
    Redirect
  } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
    const {currentUser} = useContext(AuthContext);

    /* useEffect(() => {
        console.log('private',currentUser)
    }, []) */
    
    return (
        <Route
            {...rest}
            render={routeProps => 
                !!currentUser ? (
                    <RouteComponent {...routeProps}/>
                ):(
                    <Redirect to={"/login"}/>
                )
            }
        />
    )
}

/* export default function PrivateRoute({ children, ...rest }) {
    const {currentUser} = useContext(AuthContext);

    return (
        <Route
          {...rest}
          render={
            ({ location }) => (
              !!currentUser ? (
                  children
                ):(
                  <Redirect
                    to={{
                      pathname: '/login',
                      state: { from: location }
                    }}
                  />
                )
            )
          }
        />
      );
} */


