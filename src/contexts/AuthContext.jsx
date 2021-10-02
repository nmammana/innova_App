import React , {createContext, useEffect, useState} from 'react'

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
    
    const [isLogged, setIsLogged] = useState(false);
   
    return (
        <AuthContext.Provider value={{isLogged, setIsLogged}}>
            {children}
        </AuthContext.Provider>
    )
}