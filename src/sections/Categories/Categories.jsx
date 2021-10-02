import React, { useContext, useEffect, useState } from 'react'
import firebase from 'firebase';
import Loading from '../../components/Loading/Loading';

import './Categories.scss';

import '../../assets/icons/coolicons.scss'

import {
    Table,
    Tbody,
    Tr,
    Td,
    Container,
    
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    IconButton,
    Box,
} from "@chakra-ui/react"

import CategoryEditModal from './CategoryEditModal';
import CategoryAddModal from './CategoryAddModal';
import { CategoriesContext } from '../../contexts/CategoriesContext';

export default function Categories() {
    const [category, setCategory] = useState("");
    const db = firebase.firestore();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {categories, setCategories, isLoadingCategories, setIsLoadingCategories} = useContext(CategoriesContext);

    const capitalize = (word) => {
        return word[0].toUpperCase() + word.slice(1);
    }

    const handleChange = (e) => {
        setCategory(e.target.value);
    }

    const createCategory = async (e)=> {
        e.preventDefault();
        setIsLoadingCategories(true);
        try{
            const {id: categoryId} = await db.collection('categories').add({
                name: capitalize(category)
            })
            let categoriesListUpdated = [...categories, {name: capitalize(category), id:categoryId}];
            setCategories(categoriesListUpdated);
        }catch(error){
            console.error('Error adding new category: ',error);
        }
        setCategory("");
        setIsLoadingCategories(false);
        console.log('category created')
    }

    const editCategory = async(id, newCategoryName) => {
        setIsLoadingCategories(true);
        try{
            await db.collection('categories').doc(id).update({
                name: capitalize(newCategoryName)
            })
        }catch(error){
            console.error('Error modifying category:',error);
        }
        let categoriesListUpdated = [];
        categories.forEach((category) => { 
            if(category.id === id){
                categoriesListUpdated.push({name: capitalize(newCategoryName), id:id})
            }else{
                categoriesListUpdated.push(category);
            }
        })
        console.log(categoriesListUpdated)
        setCategories(categoriesListUpdated); 
        setIsLoadingCategories(false);
    }

    const deleteCategory = async (categoryDeleted) => {
        setIsLoadingCategories(true);
        try{
            await db.collection('categories').doc(categoryDeleted.id).delete(); 
        }catch(error){
            console.error('Error deleting category:',error);
        }
        const nonDeletedCategories = categories.filter(category => category.id !== categoryDeleted.id);
        setCategories(nonDeletedCategories);
        setIsLoadingCategories(false);
    }

    return (
        <>
            {categories &&
            <>
                <a className="link" onClick={onOpen}><p className="body1 link-text">Administrar categorías</p></a>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader className="heading2 title" style={{padding: "1.5em 0"}}>Categorías</ModalHeader>
                        
                        <ModalCloseButton   className= "button" variant="solid" colorScheme="#5F2F8B" 
                                            color="#5F2F8B" borderRadius="6px"/>
                        
                        <ModalBody>
                            <Container>
                                <Table className="categories-table" variant="simple">                           
                                    <Tbody>
                                    {categories.map((category) => (
                                        <Tr className="category-item" key={category.id}>
                                            <Td className="heading3" color="#5F2F8B">{category.name}</Td> 
                                            <Td>
                                                <CategoryEditModal 
                                                    name = {category.name}
                                                    id = {category.id}
                                                    editCategory = {editCategory}
                                                />
                                            </Td>
                                            <Td>
                                                <IconButton onClick={()=>deleteCategory(category)} 
                                                            icon={<i className="ci-trash_empty"></i>}/>                                             
                                            </Td>  
                                        </Tr>
                                    ))}
                                    </Tbody>
                                </Table>
                            </Container>
                        </ModalBody>
                        {isLoadingCategories && <Loading/>}
                        <ModalFooter>
                            <Box className="button-center">
                                <CategoryAddModal
                                    handleChange = {handleChange}
                                    category = {category}
                                    createCategory = {createCategory}
                                />
                                
                                <Button className= "button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                        borderRadius="6px" size="sm" onClick={onClose}>Cerrar</Button>
                            </Box>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
            }
        </>
    )
}
