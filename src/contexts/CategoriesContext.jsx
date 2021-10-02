import React , {createContext, useEffect, useState} from 'react';
import { getFirebaseCategories } from '../services/CategoriesService';

export const CategoriesContext = createContext();

export default function CategoriesContextProvider({children}) {

    const [categories, setCategories] = useState();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);

    const updateCategories = async () => {
        const categories = await getFirebaseCategories();
        setCategories(categories);
    }
    
    useEffect(async() => {
        console.log('Entra a use effect categoriesContext');
        await updateCategories();
    }, [])

    return (
        <CategoriesContext.Provider value={{categories, setCategories, isLoadingCategories, setIsLoadingCategories}}>
            {children}
        </CategoriesContext.Provider>
    )
}
