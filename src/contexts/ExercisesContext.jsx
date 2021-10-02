import React , {createContext, useEffect, useState} from 'react';
import { getFirebaseExercises } from '../services/ExercisesService';

export const ExercisesContext = createContext();

export default function ExercisesContextProvider({children}) {
    
    const[exercises, setExercises] = useState([]);
    const[isLoadingExercises, setIsLoadingExercises] = useState(false)

    const updateExercises = async() => {
        setIsLoadingExercises(true);
        const exercises = await getFirebaseExercises();
        setExercises(exercises);
        setIsLoadingExercises(false);
    }

    useEffect(() => {
        updateExercises();
    }, []) 
    
    return (
        <ExercisesContext.Provider 
            value={{
                exercises, 
                setExercises,  
                isLoadingExercises, 
                setIsLoadingExercises}}>
                    {children}
        </ExercisesContext.Provider>
    )
}