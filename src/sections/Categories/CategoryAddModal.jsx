import React from 'react'

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
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
      
    FormControl,
    FormLabel,
    Input,
    Flex,
    Box,
} from "@chakra-ui/react"

export default function AddCategoryModal({handleChange, category, createCategory}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button className= "button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                    borderRadius="6px" size="sm" onClick={onOpen}>
                Nueva categoría
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader className="heading2 title" style={{padding: "1em 0"}}>Nueva categoría</ModalHeader>
                <ModalCloseButton className= "button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                    borderRadius="6px" />
                <ModalBody>
                    <form className="form" onSubmit={(e)=>{createCategory(e); onClose()}}>
                        <Box className= "form-center">
                            <FormLabel className="form-font">Nombre de la categoría:</FormLabel>
                            <Input   type= "text" className= "form-input form-font"
                                    name = "category" onChange={(e)=>handleChange(e)} value={category} required></Input >     
                        </Box>
                        <Box className="button-center">
                            <Button className= "button" type= "submit" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                    borderRadius="6px" size="sm">Añadir</Button>
                            <Button className= "button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                    borderRadius="6px" size="sm" onClick={onClose}>
                                Cerrar
                            </Button>
                        </Box>
                    </form>
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
