import React , {createContext, useState} from 'react';
import { getExercise } from '../components/ExercisesService';

export const ExerciseSelectedContext = createContext();

export default function ExerciseSelectedContextProvider({children}) {
    const [exerciseSelected, setExerciseSelected] = useState({
        name: "",
        category: "",
        video: "",
        id:"",
    });

    const [isExerciseListModified, setIsExerciseListModified] = useState(false);

    const fetchExerciseSelected = async (exercise) => {
        const exerciseFetched =  await getExercise(exercise);
        setExerciseSelected(...exerciseFetched);
    }

    const clearExercise = () => {
        setExerciseSelected({
            name: "",
            category: "",
            video: "",
            id:""
        });
    }
    
    return (
        <ExerciseSelectedContext.Provider value={{exerciseSelected, fetchExerciseSelected, clearExercise, isExerciseListModified, setIsExerciseListModified}}>
            {children}
        </ExerciseSelectedContext.Provider>
    )
}