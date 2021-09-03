import React, { useEffect, useState } from 'react';
import { getFirebaseCategories } from './ExercisesService';

import CreatableSelect from 'react-select/creatable';

export default function Creatable({categoryHandleChange,initialCategory}) {

    const createOption = (label) => ({
        label: label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });

    const chargeCategories = (categories) => {
        let items = []; 
        categories.map((category) => {
            items.push(createOption(category.name));
        })
        console.log('items', items);
        return items;
    }
    
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    //const [options, setOptions] = useState([]);
    const [value, setValue] = useState('');

    /* const getCategories = async () => {
        const categories = await getFirebaseCategories();
        setCategories(categories);
    } */

    /* HECHO */
    useEffect(async() => {
        const categoriesFetched = await getFirebaseCategories();
        const categories = chargeCategories(categoriesFetched)
        setCategories(categories);
        console.log(categories);
        if(initialCategory){
            setValue(initialCategory);
            console.log('initial value',initialCategory);
        }
    },[]);
    
    
    /* const handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value: newValue });
    }; */

    const handleCreate = (/* inputValue: any */) => {
    /* this.setState({ isLoading: true });
    console.group('Option created');
    console.log('Wait a moment...');
    setTimeout(() => {
        const { options } = this.state;
        const newOption = createOption(inputValue);
        console.log(newOption);
        console.groupEnd();
        this.setState({
        isLoading: false,
        options: [...options, newOption],
        value: newOption,
        });
    }, 1000); */
    };

    return (
    <>
        <p>{initialCategory}</p>
        <CreatableSelect
            isClearable
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={(newValue)=>categoryHandleChange(newValue)}
            onCreateOption={handleCreate}
            options={categories}
            value={value}            
        />
    </>
    )
}


