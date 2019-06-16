import React, { Component } from 'react'

import ModalContext from '../../context/ModalContext'
import ModalController from '../../classes/ModalController'

import './Overlay.scss'

/**
 * NOTES:
 * I added the overlay here because I believe it's best practice to
 * have an overlay object handled inside the component rather than outside
 */
class ModalProvider extends Component {

    /**
     * This method is used as a binder to force
     * the controller to used the correct functions
     * in the provider given it's instance
     *
     * @static
     * @param {ModalProvider} provider The ModalProvider instance
     * @param {Function} cb The callback to set the method privatly
     * @memberof ModalProvider
     */
    static bindController(provider, cb) {
        // cb(provider._updateOverlay)
    }

    constructor(props) {
        super(props)
        
        this.ref = React.createRef()
        this.controller = new ModalController(this.ref)
    }
    
    _modalControl = (e) => {
        e.stopPropagation()
    }

    render() {

        const { children } = this.props

        return (<ModalContext.Provider value={this.controller} >
            <div className='overlay' ref={this.ref}></div>
            {children}
        </ModalContext.Provider>)
    }
}

export default ModalProvider