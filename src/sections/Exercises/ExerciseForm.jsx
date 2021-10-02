import React, { useContext, useEffect, useState } from 'react'

import Loading from '../../components/Loading/Loading'
import firebase from 'firebase'
import Creatable from 'react-select/creatable';

import {    Select,
            FormLabel,
            Input,
            Button,
            Flex,
            Box,
            ModalFooter,
        } from "@chakra-ui/react"
import { ExercisesContext } from '../../contexts/ExercisesContext'
import ExerciseVideoModal from './ExerciseVideoModal'
import { CategoriesContext } from '../../contexts/CategoriesContext';


export default function ExerciseForm({onClose, exercise}) {
    const {id} = exercise ? exercise : "" ;    
    
    const [form, setForm] = useState({
        name: "",
        category: "",
        video: "",
    })
    const [isLoading, setIsLoading] = useState(false);
    const db = firebase.firestore();
    const {categories, setCategories} = useContext(CategoriesContext);
    const { 
        exercises, 
        setExercises,
        isLoadingExercises, 
        setIsLoadingExercises
    } = useContext(ExercisesContext);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState('');   

    const selectCustomStyles = {
        singleValue: (provided,state) => ({  
            ...provided,
            color: '#5A5555',
            transition: 'opacity 300ms',
          
        }),
        container: (provided, state) => ({
            ...provided, 
            border: 'transparent',
            borderRadius: '6px'
        }),
        control: (provided, state) => ({
            ...provided, 
            border: '2px solid #804AB0',
            borderRadius: '6px',
            height: '2.5em',
        })
    }

    const capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1);
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
            label: capitalize(categoryName),
            value: capitalize(categoryName.toLowerCase().replace(/\W/g, '')),
        });
        setForm({...form, category: capitalize(categoryName)});
    }

    const createCategory = async (categoryName)=> {
        try{
            const {id: categoryId} = await db.collection('categories').add({
                name: capitalize(categoryName)
            })
            let categoriesListUpdated = [...categories, {name: capitalize(categoryName), id:categoryId}];
            setCategories(categoriesListUpdated);
        }catch(error){
            console.error('Error adding new category: ',error);
        }
        console.log('category created')
    }

    const handleSubmit = async (e) =>{
        setIsLoadingExercises(true);
        e.preventDefault()
        if(!id){ 
            createExercise();
        }
        else{
            editExercise();
        }
        onClose();
        setIsLoadingExercises(false);
        setForm({
            name:"",
            category: form.category,
            video:""
        })
    }

    const createExercise = async () =>{
        try{
            const {id: exerciseId} = await db.collection('exercises').add({
                name: capitalize(form.name),
                category : form.category,
                video : form.video
            })
            let exercisesListUpdated = [
                ...exercises, {
                    name: capitalize(form.name),
                    category : form.category,
                    video : form.video,
                    id: exerciseId
                }];
            setExercises(exercisesListUpdated);
            console.log('Ejercicio añadido con exito!');
        }catch(error){
            console.error('Error adding exercise:',error);
        }
    }

    const editExercise = async () => {
        try{
            await db.collection('exercises').doc(id).update({
                name: capitalize(form.name),
                category : form.category,
                video : form.video
            })
            let exercisesListUpdated = [];
            exercises.forEach((exercise) => {
                if(exercise.id === id){
                    exercisesListUpdated.push({ 
                        name: capitalize(form.name),
                        category : form.category,
                        video : form.video, 
                        id:id
                    })
                }else{
                    exercisesListUpdated.push(exercise);
                }
            })
            setExercises(exercisesListUpdated); 
            console.log('Ejercicio modificado con exito!')
        }catch(error){
            console.error('Error modifying exercise:',error);
        }
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
                    <FormLabel className="form-font form-label">Nombre</FormLabel>
                    <Input  type= "text" className= "form-input form-font" name = "name" 
                            onChange={handleChange} value={form.name} required></Input>
                </div>

                <div className= "input-container">
                    <FormLabel className="form-font form-label">Categoría</FormLabel>
                    <Creatable 
                        placeholder="Elija una categoría..."
                        isClearable
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        options={options}
                        onChange={(value)=>handleChange(value)} 
                        onCreateOption={handleCreate}
                        value={value}                
                        styles={selectCustomStyles}
                        className="form-font"
                    />
                </div>

                <div className= "input-container">
                    <FormLabel className="form-font form-label">Video</FormLabel>
                    <Input  type= "text" className= "form-input form-font" name = "video" 
                            onChange={handleChange} value={form.video} required></Input><br/>
                </div>

                {form.video &&
                    
                    <Flex align="center">
                        <h2 className="heading3">Vista previa del video: </h2>
                        <ExerciseVideoModal name={form.name} video={form.video}/>
                    </Flex>
                    
                }                  
                
                <Box className="button-center">
                    {id ? (
                        <Button className="button" variant="solid" size="sm" 
                                type="submit" disabled={!form.category} onClick={onClose}>
                            Guardar cambios
                        </Button>
                    ):(
                        <Button className="button" variant="solid" size="sm" 
                                type= "submit" disabled={!form.category}>
                            Añadir
                        </Button>
                    )}
                        <Button className="button" variant="solid" size="sm" 
                                onClick={onClose}>
                            Cerrar
                        </Button>
                </Box>    
                
            </form>
        </>
    )
}
