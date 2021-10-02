import React from 'react'

import '../../styles/Alert.scss'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    IconButton,
    AlertDialogCloseButton,
    Button,
    Box,
    
} from "@chakra-ui/react"

export default function RoutineShareModal({routine}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    return (
        <>
            <IconButton 
                onClick={onOpen} className="icon-button"
                icon={<i className="ci-share_outline"></i>}/>

            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader className="alert-header">Compartir</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        
                    </AlertDialogBody>
                    <AlertDialogFooter className="alert-buttons-container">    
                        <Button ref={cancelRef} onClick={onClose}>
                            Cerrar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> 
        </>
    )
}
