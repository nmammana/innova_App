import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';

import { FirebaseAppProvider } from 'reactfire';
import FirebaseConfig from './components/FirebaseConfig';
import App from './components/App'

import { ChakraProvider } from "@chakra-ui/react"


ReactDOM.render((
    <FirebaseAppProvider firebaseConfig={FirebaseConfig}>
        <ChakraProvider>
            <Suspense fallback={'Conectando la app...'}>
                <App />
            </Suspense>
        </ChakraProvider>
    </FirebaseAppProvider>
    ), document.getElementById('root'));


