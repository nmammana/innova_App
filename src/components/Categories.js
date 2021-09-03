import React, { useEffect, useState } from 'react'
import firebase from 'firebase';
import Loading from './Loading';

import {getFirebaseCategories} from './ExercisesService';

import '../styles/Categories.scss';

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Container,

    Button,
      
    FormControl,
    FormLabel,
    Input,
    Flex,
    Box,
} from "@chakra-ui/react"

import EditCategoryModal from './EditCategoryModal';

export default function Categories() {
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const db = firebase.firestore();
    
    const updateCategories = async () => {
        const categories = await getFirebaseCategories();
        setCategories(categories);
    }

    const createCategory = async (e)=> {
        e.preventDefault();
        setIsLoading(true);
        await db.collection('categories').add({
            name: category
        })
        await updateCategories();
        setCategory("");
        setIsLoading(false);
        console.log('category created')
    }

    const editCategory = async(id, newCategoryName) => {
        setIsLoading(true);
        try{
            await db.collection('categories').doc(id).update({
                name: newCategoryName
            })
        }catch(error){
            console.error(error);
        }
        await updateCategories();
        setIsLoading(false);
    }

    const deleteCategory = async (categoryDeleted) => {
        try{
            await db.collection('categories').doc(categoryDeleted.id).delete(); 
        }catch(error){
            console.error(error);
        }
        const nonDeletedCategories = categories.filter(category => category.id !== categoryDeleted.id);
        setCategories(nonDeletedCategories);
    }
    
    useEffect(async () => {
        setIsLoading(true);
        await updateCategories();
        console.log('Entra a useEffect Categories');
        setIsLoading(false);
    },[]);
    
    return (
        <>
            <h1 className="heading1 title" style={{padding: '1em 0'}}>Categorías</h1>
            {isLoading && <Loading/>}
            {categories &&
                <Container>
                    <Table className="categories-table" variant="simple">                           
                        <Tbody>
                        {categories.map((category) => (
                            <Tr className="category-item" key={category.id}>
                                <Td className="heading3" color="#5F2F8B">{category.name}</Td> 
                                <Td>
                                    <EditCategoryModal 
                                        name = {category.name}
                                        id = {category.id}
                                        editCategory = {editCategory}
                                    />
                                </Td>
                                <Td><Button className="button" variant="solid" colorScheme="#5F2F8B" size="sm" color="#5F2F8B"
                                            borderRadius="6px" onClick={()=>deleteCategory(category)}>Eliminar</Button></Td>  
                            </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Container>
            }
            
            {isAdding ? (
                <form className="form" onSubmit={createCategory}>
                    <Box className= "form-center">
                        <FormLabel className="form-font">Nombre de la categoría:</FormLabel>
                        <Input   type= "text" className= "form-input form-font"
                                name = "category" onChange={(e)=> setCategory(e.target.value)} value={category} required></Input >     
                    </Box>
                    <Box className="button-center">
                        <Button className= "button" type= "submit" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                borderRadius="6px" size="sm">Añadir</Button>
                        <Button className= "button" variant="solid" colorScheme="#5F2F8B" size="sm" color="#5F2F8B"
                                borderRadius="6px" onClick={()=> setIsAdding(false)}>Cerrar</Button>
                    </Box>
                </form>
                
            ):(
                <Box className="button-center">
                    <Button className="button" variant="solid" colorScheme="#5F2F8B" size="sm" color="#5F2F8B"
                            borderRadius="6px" onClick={()=> setIsAdding(true)}>Añadir categoría</Button>  
                </Box>
            )}
        </>
    )
}
