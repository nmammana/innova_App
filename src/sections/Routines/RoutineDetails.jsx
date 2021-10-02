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
import RoutineDayCard from './RoutineDayCard';
import './RoutineDetails.scss';

export default function UserDetails({routine}) {
    const {title, user, comments, days, id} = routine;

    let today = new Date();
    let birthDate = new Date(user.birth);
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
                    <ModalHeader className="heading2 title">{title} - {user.name}</ModalHeader>
                    <ModalCloseButton className="button"/>
                    <ModalBody>
                        <div >
                            <section className="user-data">
                                <p className="name">{user.name}</p>  
                                <p className="age">{age} años</p>
                                <p className="id-number">DNI: {user.identityNumber}</p>
                                <p className="personal-data">Información personal: {user.comments}</p>
                            </section>
                          
                            <p className="routine-description">Información de la rutina: {comments}</p> 
                        </div>    
                        {routine.days.map((day,index) =>
                            <div key={index}>
                                <RoutineDayCard day={day}/>
                            </div>
                        )}
                        
                        
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
