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

import './UserDetails.scss';

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
                    <ModalHeader className="heading2 title" >{name}</ModalHeader>
                    <ModalCloseButton className="button"/>
                    <ModalBody>
                        <div className="user-data">
                            <p className="email">{email}</p>
                            <p>DNI: {identityNumber}</p>  
                            <p>Edad: {age} años.</p>
                            <p>Información personal: {comments}</p>
                        </div>
                    </ModalBody> 
                    <ModalFooter>
                        <Button className="button" variant="solid" size="sm" onClick={onClose}>
                            Cerrar
                        </Button>   
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
