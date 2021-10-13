import React , {createContext, useEffect, useState} from 'react';
import { getFirebaseCategories } from '../services/CategoriesService';

export const CategoriesContext = createContext();

export default function CategoriesContextProvider({children}) {

    const [categories, setCategories] = useState();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);

    const updateCategories = async () => {
        setIsLoadingCategories(true);
        const categories = await getFirebaseCategories();
        setCategories(categories);
        setIsLoadingCategories(false);
    }
    
    useEffect(async() => {
        await updateCategories();
    }, [])

    return (
        <CategoriesContext.Provider value={{categories, setCategories, isLoadingCategories, setIsLoadingCategories}}>
            {children}
        </CategoriesContext.Provider>
    )
}
