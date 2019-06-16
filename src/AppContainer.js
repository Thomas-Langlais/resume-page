import React from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

import App from './App'
import ModalProvider from './providers/ModalProvider';

const AppContainer = () => {

    // TODO: add a navbar
    return (<ModalProvider>
        <ParallaxProvider>
            <App />
        </ParallaxProvider>
    </ModalProvider>)
}

export default AppContainer