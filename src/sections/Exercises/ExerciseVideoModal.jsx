import React from 'react'

import {
    AspectRatio,
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

import '../../assets/icons/coolicons.scss'


export default function VideoModal({name,video}) {
    
    const {isOpen, onOpen, onClose} = useDisclosure();
    let videoId = "";
    if(video){
        let urlSplit = video.split(".");
        if(urlSplit.length>2 && urlSplit[1]==="youtube"){
            if(video.includes("v=")){
                videoId = video.split('v=')[1];
            }
            if(videoId.includes('&')){
                const ampersantPosition = videoId.indexOf('&');
                if(ampersantPosition !== -1){
                    videoId = videoId.substring(0,ampersantPosition);
                }
            }
        }
    }
    return (
        <>
            <IconButton 
                    onClick={onOpen} className="icon-button"
                    icon={<i className="ci-youtube"></i>}/>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="heading2 title">{name}</ModalHeader>
                    <ModalCloseButton className="button" />
                    <ModalBody >
                    <div className= "video-container">
                        <AspectRatio>
                            <iframe src={`https://www.youtube.com/embed/${videoId}`} style={{borderRadius: '6px'}} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </AspectRatio>
                    </div>
                    </ModalBody> 
                    <ModalFooter>    
                        <div className="button-container">
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
