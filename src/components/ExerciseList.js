import React, { useContext, useEffect, useState } from 'react'
import ExerciseCard from './ExerciseCard';
import Loading from './Loading';
import firebase from 'firebase';
import { getFirebaseCategories, getFirebaseExercises} from './ExercisesService';
import '../styles/ExerciseList.scss'
import {    Select,
            Table,
            Thead,
            Tbody,
            Tr,
            Th,
            Td,
            Input,
            Flex,
            Spacer, 
            Box,
            
            
} from "@chakra-ui/react"
import { ExerciseSelectedContext } from '../contexts/ExerciseSelectedContext';
import AddExerciseModal from './AddExerciseModal';


export default function ExerciseList() {
    const[exercises, setExercises] = useState([]);
    const[categories, setCategories] = useState([]);
    const[isLoading, setIsLoading] = useState(false);
    const[category, setCategory] = useState('');
    const[searchFilter, setSearchFilter] = useState('');
    const db = firebase.firestore();
    const {isExerciseListModified, setIsExerciseListModified, clearExercise} = useContext(ExerciseSelectedContext);

    const updateCategories = async () => {
        setIsLoading(true);
        const categories = await getFirebaseCategories();
        setCategories(categories);
        setIsLoading(false);
    }

    const getExercisesByCategory = (category) => {
        return db
            .collection('exercises')
            .where('category','==',category)
            .orderBy('name')
            .get()
            .then(snapshot => {
                const items = [];
                snapshot.forEach((exerciseDocument) =>{
                    const {name, category, video} = exerciseDocument.data();
                    const id = exerciseDocument.id;
                    items.push({name, category, video, id})
                });
                return items;
            });
    }    
    
    useEffect(async () => {
        setExercises([]);
        updateCategories();
        setIsLoading(true);
        if(category){
            const exercisesByCategory = await getExercisesByCategory(category);
            setExercises(exercisesByCategory);
        }
        else{
            const exercisesAll = await getFirebaseExercises();
            setExercises(exercisesAll);
        }
        setIsExerciseListModified(false);
        setIsLoading(false);
    },[category, isExerciseListModified===true]);
    
    const deleteExercise = async (exerciseDeleted) =>{
        try{
            await db.collection('exercises').doc(exerciseDeleted.id).delete()
        }catch(error){
            console.error(error);
        }
        const nonDeletedExercises = exercises.filter(exercise => exercise.id !== exerciseDeleted.id)
        setExercises(nonDeletedExercises);
    }
    
    return (
        <>  
            {categories &&
                <form className="form">
                    <Box className="search-bar">
                        <Box className="search-bar__select">
                            <Select placeholder="Elija una categoría" className="form-input form-font" 
                                    name="category" onChange={(e)=>setCategory(e.target.value)}
                                    disabled={categories?.length === 0}>
                                {categories.map((category) => (   
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </Select>
                        </Box>
                        <Box className="search-bar__input">
                            <Input  type= "text" className= "form-input form-font" name = "name" 
                                    placeholder="Nombre del ejercicio" onChange={(e)=>setSearchFilter(e.target.value)} value={searchFilter}></Input>
                        </Box>
                        <Box>
                            <AddExerciseModal/>
                        </Box>
                    </Box>
                    
                </form>
            }
            
            
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Nombre</Th>
                        <Th>Categoría</Th>
                        <Th>Video</Th>
                    </Tr>
                </Thead>
                <Tbody>
                        {exercises.filter((exercise) => {
                            if(searchFilter===""){
                                return exercise;
                            } else if(exercise.name.toLowerCase().includes(searchFilter.toLowerCase())){
                                return exercise;
                            }
                        }).map((exercise)=>(
                            <ExerciseCard
                                exercise={exercise}
                                key={exercise.id}
                                deleteExercise={deleteExercise}
                            />
                        ))}
                </Tbody>
            </Table>
            {exercises?.length===0 && category && 
                <p className="body1" style={{textAlign:'center', color: '#5F2F8B'}}>Aún no hay ejercicios en esta categoría</p>
            }  
            {isLoading && <Loading/>}
            {/* {exercises && 
                <form className="form">
                    <Select placeholder="Elija el ejercicio que quiera visualizar" className="form-input form-font"
                            name="exerciseSelected" disabled={exercises?.length===0}
                            onChange={(e)=>{fetchExerciseSelected(e.target.value)}}> 
                        {exercises.map((exercise) => (
                            <option key={exercise.id} value={exercise.name}>{exercise.name}</option>
                        ))}
                    </Select>
                </form>
            } */}
            {/* {exerciseSelected.name  && 
                <ExerciseCard
                    deleteExercise={deleteExercise}
                />
            } */}
            
        </>
    )
}
