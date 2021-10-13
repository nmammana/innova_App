import React, { useState, useContext, useEffect } from 'react'

import { UsersContext } from '../../contexts/UsersContext';
import {    
    FormLabel,
    Input,
    Button,
    Textarea,
} from "@chakra-ui/react"
import firebase from 'firebase'
import { ExercisesContext } from '../../contexts/ExercisesContext';
import ExerciseVideoModal from '../Exercises/ExerciseVideoModal';
import RoutineExerciseCard from './RoutineExerciseCard';
import RoutineDayCard from './RoutineDayCard';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import { RoutinesContext } from '../../contexts/RoutinesContext';
import './RoutineForm.scss'

import Select from 'react-select';

export default function RoutineForm({onClose, routine}) {
    const {id} = routine ? routine : "" ;  
    const db = firebase.firestore();
    const {users} = useContext(UsersContext);
    const {exercises} = useContext(ExercisesContext);
    const {categories} = useContext(CategoriesContext);
    const {routines, setRoutines, isLoadingRoutines, setIsLoadingRoutines} = useContext(RoutinesContext);
    const {isLoadingUsers} = useContext(UsersContext);
    const {isLoadingCategories} = useContext(CategoriesContext);
    const {isLoadingExercises} = useContext(ExercisesContext);

    const [form, setForm] = useState({
        title: "",
        user: {
            name:"",
            email:"",
            identityNumber:"",
            birth:"",
            comments:"",
            id:""
        },
        comments: "",
        days: [],
    })

    const [categorySelected, setCategorySelected] = useState ("");

    const [exerciseSelected, setExerciseSelected] = useState({
        exercise: {
            name:"",
            category:"",
            video:""
        },
        comments:"",
    })

    const [day, setDay] = useState({
        dayName:"",
        exercises:[],
    })
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [usersOptions, setUsersOptions] = useState([]);
    const [exercisesOptions, setExercisesOptions] = useState([]);
    const [categoryValue, setCategoryValue] = useState("");
    const [exerciseValue, setExerciseValue] = useState("");
    const [userValue, setUserValue] = useState("");

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

    const handleChange = (e, action) =>{
        
        if(!e){
            if(action.name==="user"){
                setUserValue("");
                setForm({...form, user:{} })
            }else if(action.name === "exercise"){
                setExerciseValue("");
            }else if(action.name === "category"){
                setCategoryValue("");
            }
        }else if(e.label){
            if(action.name === 'user'){
                users.filter((user) => {
                    if(user.name.toLowerCase().includes(e.label.toLowerCase())){
                        setForm({...form, [action.name]: user});
                    }
                })
                setUserValue(e);
            }else if(action.name === 'exercise'){
                exercises.filter((exercise) => {
                    if(exercise.name.toLowerCase().includes(e.label.toLowerCase())){
                        setExerciseSelected({exerciseSelected, [action.name]: exercise});
                    }
                })
                setExerciseValue(e);
            }else if(action.name === 'category'){
                setCategorySelected(e.value);
                setCategoryValue(e);
            }
        }/* else if(e.target.name === 'user'){
            users.filter((user) => {
                if(user.name === e.target.value){
                    setForm({...form, [e.target.name]: user});
                }
            })
        }else if(e.target.name === 'exercise'){
            exercises.filter((exercise) => {
                if(exercise.name === e.target.value){
                    setExerciseSelected({...exerciseSelected, [e.target.name]:exercise});
                }
            })
        } */else if(e.target.name === 'exerciseComments'){
            setExerciseSelected({...exerciseSelected, comments: e.target.value});
        }/* else if(e.target.name === 'category'){
            setCategorySelected(e.target.value);
        } */else{
            setForm({...form, [e.target.name]: e.target.value});
        }
    }

    const addExerciseToDay = () => {
        let dayExercises = [];
        if(day.exercises){
            day.exercises.map(exercise => {
                dayExercises.push(exercise)
            })
        }
        dayExercises.push(exerciseSelected);
        setDay({...day, exercises: dayExercises, });
        setExerciseSelected({
            exercise: {
                name:"",
                category:"",
                video:""
            },
            comments:"",
        })
    }

    const addDayToRoutine = () => {
        let days = [];
        if(form.days){
            form.days.map(day => {
                days.push(day)
            }) 
        }
        days.push(day);
        setForm({...form, days: days})
        setDay({...day, exercises:[],
        });
        setExerciseSelected({
            ...exerciseSelected, 
            coments:"",
        })
    }

    const deleteDay = (dayName) => {
        let daysUpdated = [];
        let dayCounter=1;
        form.days.filter(day => {
            if(day.dayName !== dayName){
                daysUpdated.push(day);
               //
            }
        })
        daysUpdated.map((day) => {
            day.dayName = `Dia ${dayCounter}`;
            dayCounter += 1;
        })
        
        setForm({...form, days: daysUpdated});
    } 

    const deleteExerciseFromDay = (exerciseDeleted) => {
        let updatedExercises = [];
        day.exercises.filter(exercise => {
            if(exercise !== exerciseDeleted){
                updatedExercises.push(exercise);
            }
        })
        setDay({...day, exercises: updatedExercises});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoadingRoutines(true);
        if(!id){ 
            createRoutine();
        }
        else{
            editRoutine();
        }
        onClose();
        setIsLoadingRoutines(false);
        setForm({
            title: "",
            user: {},
            comments: "",
            days: [],
        })
    }

    const createRoutine = async () =>{
        try{
            const {id: routineId} = await db.collection('routines').add({
                title: capitalize(form.title),
                user: form.user,
                comments: form.comments,
                days: form.days,
            })

            let routinesListUpdated = [
                ...routines, {
                    title: capitalize(form.title),
                    user: form.user,
                    comments: form.comments,
                    days: form.days,
                    id: routineId,
                }];
            setRoutines(routinesListUpdated);
            
        }catch(error){
            console.error('Error adding routine:',error);
        }
    }

    const editRoutine = async () => {
        try{
            await db.collection('routines').doc(id).update({
                title: capitalize(form.title),
                user: form.user,
                comments : form.comments,
                days : form.days,
            })
            let routinesListUpdated = [];
            routines.forEach((routine) => {
                if(routine.id === id){
                    routinesListUpdated.push({ 
                        title: capitalize(form.title),
                        user : form.user,
                        comments : form.comments,
                        days: form.days,
                        id:id,
                    })
                }else{
                    routinesListUpdated.push(routine);
                }
            })
            setRoutines(routinesListUpdated); 
        }catch(error){
            console.error('Error modifying routine:',error);
        }
    } 

    const chargeOptions = (options) => {
        let items = []; 
        options.map((option) => {
            items.push({
                label: option.name,
                value: option.name.toLowerCase().replace(/\W/g, ''),
            });
        })
        return items;
    }

    useEffect(async ()=> {
        const categoriesOptions = chargeOptions(categories);
        setCategoriesOptions(categoriesOptions);
        let exercisesFiltered = [];
        exercises.filter(exercise => {
            if(categorySelected===""){
                exercisesFiltered.push(exercise);
            }else if(exercise.category.toLowerCase().includes(categorySelected.toLowerCase())){
                exercisesFiltered.push(exercise);
            }
        })
        const exercisesOptions = chargeOptions(exercisesFiltered);

        setExercisesOptions(exercisesOptions);
        const usersOptions = chargeOptions(users);
        setUsersOptions(usersOptions);
        
        if(routine){
            setForm({...routine});
            setUserValue({
                label: routine.user.name,
                value: routine.user.name.toLowerCase().replace(/\W/g, ''),
            })
        }
    },[categories, categorySelected, exercises, users]);

    useEffect(() => {
        setDay({...day, dayName: `Día ${form.days.length+1}`});
    }, [form.days])


    return (
        <form 
            className= "form"
            onSubmit = {handleSubmit}>
            
            <div className= "input-container">
                <FormLabel className="form-font form-label">Titulo</FormLabel>
                <Input  type= "text" className= "form-input form-font" name = "title" 
                        onChange={handleChange} value={form.title} required></Input>
            </div>
             
            <div className= "input-container">
                <FormLabel className="form-font form-label">Nombre</FormLabel>
                <Select 
                    placeholder="Elija un usuario..."
                    isClearable
                    isDisabled={isLoadingUsers}
                    isLoading={isLoadingUsers}
                    options={usersOptions}
                    onChange={(value, action)=>handleChange(value, action)} 
                    value={userValue}                
                    styles={selectCustomStyles}
                    className="form-font"
                    name="user"
                />
            </div>

            {form.user.name &&
                <div className="user-prev-card">
                    <p className="name">{form.user.name}</p>
                    <p className="id-number">DNI: {form.user.identityNumber}</p>
                </div>
            }

            <div className= "input-container">
                <FormLabel className="form-font form-label">Comentarios</FormLabel>
                <Textarea  type="text" className="form-input form-font" name="comments" 
                           onChange={handleChange} value={form.comments}></Textarea>
            </div>

            {form.days && 
                form.days.map((day,index) => 
                    <RoutineDayCard key={index} day={day} deleteDay={deleteDay}/>
                )
            }

            <div className= "input-container">
                <FormLabel className="form-font form-label">{day.dayName}</FormLabel>
                
                {day.exercises && 
                    day.exercises.map(exercise => 
                        <RoutineExerciseCard key={exercise.exercise.id} exercise={exercise} deleteExerciseFromDay={deleteExerciseFromDay}/> 
                    )
                }
            </div>

            <div className= "input-container">
                <Select 
                    placeholder="Elija una categoría..."
                    isClearable
                    isDisabled={isLoadingCategories}
                    isLoading={isLoadingCategories}
                    options={categoriesOptions}
                    onChange={(value,action)=>handleChange(value,action)} 
                    value={categoryValue}                
                    styles={selectCustomStyles}
                    className="form-font"
                    name="category"
                />
            </div>

            <div className= "input-container">
                <Select 
                    placeholder="Elija un ejercicio..."
                    isClearable
                    isDisabled={isLoadingExercises}
                    isLoading={isLoadingExercises}
                    options={exercisesOptions}
                    onChange={(value,action)=>handleChange(value,action)}
                    value={exerciseValue}                
                    styles={selectCustomStyles}
                    className="form-font"
                    name = "exercise"
                />
            </div>

            {exerciseSelected.exercise.name &&
                <div className="exercise-prev-card">
                    <div className="exercise-info">
                        <p className="exercise-name">{exerciseSelected.exercise.name}</p>
                        <ExerciseVideoModal name={exerciseSelected.exercise.name} video={exerciseSelected.exercise.video}/>
                    </div>
                    
                    <div className= "input-container">
                        <Textarea   type="text" className="form-input form-font" name="exerciseComments" 
                                placeholder="Descripción del ejercicio..." onChange={handleChange}
                                value={exerciseSelected.comments}></Textarea>
                    </div>
                </div>
            }

            <div className="button-container">
                <Button 
                    m="7.2px 0" className="button" size="sm"
                    onClick={addExerciseToDay} disabled={!exerciseSelected.exercise.name}
                    >Añadir ejercicio</Button>

                <Button 
                    m="7.2px 0" className="button" size="sm"
                    onClick={addDayToRoutine} disabled={day.exercises?.length<1}
                >Añadir día</Button>
            </div>
                
            
            <div className="button-container footer-buttons">
                {id ? (
                    <Button className="button" variant="solid" size="sm" type= "submit" disabled={!form.title}>
                        Guardar cambios
                    </Button>
                ):(
                    <Button className="button" variant="solid" size="sm" 
                    type= "submit" disabled={!form.title || !form.user}>
                        Crear rutina
                    </Button>
                )}
                    <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                            borderRadius="6px" size="sm" onClick={onClose}>
                        Cerrar
                    </Button>
            </div>    
        </form>
    )
}