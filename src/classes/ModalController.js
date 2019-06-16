import ModalProvider from '../providers/ModalProvider'

/**
 * The constructor for the ModalController
 * This is used to manage the interactions between different components
 * and the overlay
 *
 * @param {ModalProvider} providerObj contains the functions to obtain functionality
 */
function ModalController(ref) {
    
    let overlay

    overlay = ref

    this.getOverlay = function() {
        return overlay
    }
}

export default ModalController