import React , {createContext, useEffect, useState} from 'react'

import firebase from "firebase/app";
import Loading from '../components/Loading/Loading';
import Layout from '../components/Layout';

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
    const auth = firebase.auth()
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect( () => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false)
        });
    }, [])

    if(pending){
        return <Loading/>  
    }
   
    return (
        <AuthContext.Provider value={{currentUser, pending}}>
            {children}
        </AuthContext.Provider>
    )
}