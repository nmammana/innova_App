import React, { useContext, useEffect, useState } from 'react'

import Loading from './Loading'

import firebase from 'firebase'
import { getFirebaseCategories } from './ExercisesService'
import Creatable from 'react-select/creatable';

import '../styles/Form.scss'

import {    Select,
            FormControl,
            FormLabel,
            Input,
            Button,
            Flex,
        } from "@chakra-ui/react"
import { ExerciseSelectedContext } from '../contexts/ExerciseSelectedContext'
import { getCategoryByName } from './ExercisesService'
import VideoModal from './VideoModal'
//import Creatable from './Creatable'


export default function ExerciseForm({onClose, exercise}) {

    const {setIsExerciseListModified} = useContext(ExerciseSelectedContext);
    const {id} = exercise ? exercise : "" ;    
    
    const [form, setForm] = useState({
        name: "",
        category: "",
        video: "",
    })
    const [isLoading, setIsLoading] = useState(false);
    const db = firebase.firestore();
    const [categories, setCategories] = useState([]);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState('');   
    const [inputValue, setInputValue] = useState('');

    const selectCustomStyles = {
        option: (provided,state) => ({
            ...provided,
           /*  border: '2px solid #5F2F8B',
            color: state.isSelected ? '#5F2F8B':'black', */
          
        })
    }

    const handleChange = (e) =>{        
        if(!e){
            setForm({...form,category:""});
            setValue({label:"",value:""});
        }
        else if(e.label){
                setForm({...form,category:e.label});
                setValue(e);
        }else if(e.target){
            setForm({...form, [e.target.name]: e.target.value});
            }
    }

    const handleCreate = async (categoryName) =>{
        await createCategory(categoryName);
        setValue({
            label: categoryName,
            value: categoryName.toLowerCase().replace(/\W/g, ''),
        });
        setForm({...form, category: categoryName});
        /* console.log('handle create e',e);
        console.log('handle create value',value);
        console.log('handle create inputValue',inputValue); */
    }

    const createCategory = async (categoryName)=> {
        setIsLoading(true);
        await db.collection('categories').add({
            name: categoryName
        })
        await updateCategories();
        setIsLoading(false);
        console.log('category created')
    }

    /* const categoryHandleChange = (field, value) =>{    
        switch(field) {
            case 'roles':
                setValue(value);
                break;
            default:
                break;
        }
        setForm({...form, category: value.label});
        
        console.log('target value',value);
        console.log('form edited', form);
       
    } */
    
    const handleSubmit = async (e) =>{
        setIsLoading(true);
        e.preventDefault()
        if(!id){ 
            await db.collection('exercises').add({
                name: form.name,
                category : form.category,
                video : form.video
            })
            console.log('Ejercicio añadido con exito!');
        }
        else{
            await db.collection('exercises').doc(id).update({
                name: form.name,
                category : form.category,
                video : form.video
            })
            console.log('Ejercicio modificado con exito!')
        }
        setIsExerciseListModified(true);
        onClose();
        
        setIsLoading(false);
        setForm({
            name:"",
            category: form.category,
            video:""
        })
    }

    const updateCategories = async () => {
        const categories = await getFirebaseCategories();
        setCategories(categories);
    }

    const chargeOptions = (categories) => {
        let items = []; 
        categories.map((category) => {
            items.push({
                label: category.name,
                value: category.name.toLowerCase().replace(/\W/g, ''),
            });
        })
        return items;
    }

   
    
    useEffect(async ()=> {
        const categories = await getFirebaseCategories();
        //setCategories(categories);
        const options = chargeOptions(categories);
        setOptions(options);
        if(exercise){
            setForm({...exercise});
            setValue({
                label: exercise.category,
                value: exercise.category.toLowerCase().replace(/\W/g, ''),
            })
        }
    },[categories]);

    return (
        <>
            {isLoading && <Loading/>} 
            <form 
                className= "form"
                onSubmit = {handleSubmit}>
                
                <div className= "input-container">
                    <FormLabel className="form-font">Nombre</FormLabel>
                    <Input  type= "text" className= "form-input form-font" name = "name" 
                                onChange={handleChange} value={form.name} required></Input>
                </div>

                <div className= "input-container">
                    <FormLabel className="form-font">Categoría</FormLabel>

                    {/* {categories &&
                        <Select className="form-input form-font" name="category" onChange={handleChange} placeholder="Elija una categoría">
                            {categories.map((cat) => (   
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </Select>} */}
                    <Creatable 
                        /* categories={categories} */
                        isClearable
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        options={options}
                        onChange={(value)=>handleChange(value)} 
                        onCreateOption={handleCreate}
                        /* inputValue={inputValue} */
                        value={value}                
                        styles={selectCustomStyles}
                        placeHolder='Elija una categoría...'
                        
                    />
                </div>

                <div className= "input-container">
                    <FormLabel className="form-font">Video</FormLabel>
                    <Input  type= "text" className= "form-input form-font" name = "video" 
                            onChange={handleChange} value={form.video} required></Input><br/>
                </div>

                {form.video &&
                    <>
                        <Flex justify="center">
                            <h2 className="heading3" style={{color: '#5F2F8B', textAlign: 'center', padding:'0.5em'}}>Vista previa del video: </h2>
                            <VideoModal name={form.name} video={form.video}/>
                        </Flex>
                    </>
                }                  

                {id ? 
                (<div className="button-center">
                    <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                            borderRadius="6px" size="sm" type= "submit" disabled={!form.category}
                            onClick={onClose}>Guardar cambios</Button>
                </div>
                ):(
                <div className="button-center">
                    <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                            borderRadius="6px" size="sm" type= "submit" disabled={!form.category}>Añadir</Button>
                </div>)}
            </form>
        </>
    )
}
