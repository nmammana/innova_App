import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';

import App from './App'

import { ChakraProvider } from "@chakra-ui/react"

    ReactDOM.render((

        <ChakraProvider>
            <Suspense fallback={'Conectando la app...'}>
                <App />
            </Suspense>
        </ChakraProvider>
    
    ), document.getElementById('root'));


