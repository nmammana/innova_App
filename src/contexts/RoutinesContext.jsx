import React , {createContext, useEffect, useState} from 'react';
import { getFirebaseRoutines } from '../services/RoutinesService';

export const RoutinesContext = createContext();

export default function RoutinesContextProvider({children}) {
    
    const[routines, setRoutines] = useState([]);
    const[isLoadingRoutines, setIsLoadingRoutines] = useState(false);

    const updateRoutines = async() => {
        setIsLoadingRoutines(true);
        const routines = await getFirebaseRoutines();
        setRoutines(routines);
        setIsLoadingRoutines(false);
    }

    useEffect(() => {
        updateRoutines();
    }, []) 
    
    return (
        <RoutinesContext.Provider 
            value={{
                routines, 
                setRoutines,  
                isLoadingRoutines, 
                setIsLoadingRoutines}}>
                    {children}
        </RoutinesContext.Provider>
    )
}