import React from 'react'

import {
    Button,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    
} from "@chakra-ui/react"

export default function UserDetails({user}) {
    const {name, email, identityNumber, birth, comments} = user;
    
    let today = new Date();
    let birthDate = new Date(birth);
    let age = today.getFullYear()-birthDate.getFullYear();

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton 
                    onClick={onOpen} className="icon-button"
                    icon={<i className="ci-more_horizontal"></i>}/>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader className="heading2 title" color="#5F2F8B">{name}</ModalHeader>
                    <ModalCloseButton className="button"/>
                    <ModalBody>
                        <p>Correo: {email}</p>
                        <p>DNI: {identityNumber}</p>  
                        <p>Edad: {age} años.</p>
                        <p>Información personal: {comments}</p>
                    </ModalBody> 
                    <ModalFooter>
                        <Button className="button" variant="solid" colorScheme="#5F2F8B" color="#5F2F8B"
                                borderRadius="6px" size="sm" onClick={onClose}>
                            Cerrar
                        </Button>   
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
