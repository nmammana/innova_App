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
      
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Flex,
    Box,
    Spacer,
} from "@chakra-ui/react"

export default function EditCategoryModal({name, id, editCategory}) {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [newCategoryName, setNewCategoryName] = useState("");
   
    useEffect(()=> {
        setNewCategoryName(name);
    },[]);
    
    
    return (
        <>
        <Button className="button" variant="solid" colorScheme="#5F2F8B" size="sm" color="#5F2F8B"
                                            borderRadius="6px" onClick={onOpen}>Editar</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader className="heading2" color="#5F2F8B">Modificar categoría</ModalHeader>
                <ModalCloseButton className="button" />
                <ModalBody >
                    <form className="form">
                        <FormLabel>Ingrese el nuevo nombre:</FormLabel>
                        <Input  type= "text" className= "form-input form-font" name="category" /* placeholder={name} */
                                onChange={(e) => setNewCategoryName(e.target.value)} value={newCategoryName}></Input>
                    </form>
                </ModalBody> 
        
                <ModalFooter>
                    <Flex>
                        <Box className="button-center">
                            <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                    borderRadius="6px" size="sm" onClick={() => {editCategory(id, newCategoryName); onClose()}}>
                                Guardar cambios
                            </Button>
                        
                            <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                    borderRadius="6px" size="sm" onClick={onClose}>
                                Cerrar
                            </Button>
                        </Box>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}
