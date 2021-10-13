import React , {createContext, useEffect, useState} from 'react'
import { getFirebaseUsers } from '../services/UsersService';

export const UsersContext = createContext();

export default function UsersContextProvider({children}) {
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    
    const updateUsers = async() => {
        setIsLoadingUsers(true);
        const users = await getFirebaseUsers();
        setUsers(users);
        setIsLoadingUsers(false);
    }

    useEffect(() => {
        updateUsers();
    }, [])
   
    return (
        <UsersContext.Provider value={{users, setUsers, isLoadingUsers, setIsLoadingUsers}}>
            {children}
        </UsersContext.Provider>
    )
}