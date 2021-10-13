import React, { useEffect, useState } from 'react'

import {

    Button,
    
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    FormLabel,
    Input,
    Flex,
    Box,
} from "@chakra-ui/react"

import '../../assets/icons/coolicons.scss'

export default function EditCategoryModal({name, id, editCategory}) {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [newCategoryName, setNewCategoryName] = useState("");
   
    useEffect(()=> {
        setNewCategoryName(name);
    },[]);
    
    
    return (
        <>
    
        <IconButton onClick={onOpen} icon={<i className="ci-edit"></i>}/>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="heading2" color="#5F2F8B">Modificar categoría</ModalHeader>
                <ModalCloseButton className="button" />
                <ModalBody >
                    <form className="form">
                        <div className="input-container">
                            <FormLabel className="form-font form-label">Ingrese el nuevo nombre:</FormLabel>
                            <Input  type= "text" className= "form-input form-font" name="category"
                                    onChange={(e) => setNewCategoryName(e.target.value)} value={newCategoryName}></Input>
                        </div>
                    </form>
                </ModalBody> 
        
                <ModalFooter>
                    
                        <div className="button-container">
                            <Button className="button" variant="solid" size="sm"
                                    onClick={() => {editCategory(id, newCategoryName); onClose()}}>
                                Guardar cambios
                            </Button>
                        
                            <Button className="button" variant="solid" size="sm" onClick={onClose}>
                                Cerrar
                            </Button>
                        </div>
                   
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}
