import React from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormLabel,
    Input,
} from "@chakra-ui/react"

export default function AddCategoryModal({handleChange, category, createCategory}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button className= "button" variant="solid" size="sm" onClick={onOpen}>
                Nueva categoría
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader className="heading2 title">Nueva categoría</ModalHeader>
                <ModalCloseButton className= "button" variant="solid"/>
                <ModalBody>
                    <form className="form" onSubmit={(e)=>{createCategory(e); onClose()}}>
                        <div className= "input-container">
                            <FormLabel className="form-font form-label">Nombre de la categoría:</FormLabel>
                            <Input   type= "text" className= "form-input form-font"
                                    name = "category" onChange={(e)=>handleChange(e)} value={category} required></Input >     
                        </div>

                        <div className="button-container">
                            <Button className= "button" type= "submit" size="sm">Añadir</Button>
                            <Button className= "button" variant="solid" size="sm" onClick={onClose}>
                                Cerrar
                            </Button>
                        </div>
                    </form>
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
