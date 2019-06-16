import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import withModalController from '../withModalController'

import './Modal.scss'

class Modal extends Component {

    static propTypes = {
        onExit: PropTypes.func
    }

    get controller() {
        return this.props.modalController
    }

    _handleContent = (e) => {
        e.stopPropagation()
    }

    render() {

        const { children, onExit } = this.props

        return ReactDOM.createPortal(
            <div className='modal' onClick={onExit}>
                <div className='modal__content' onClick={this._handleContent}>
                    {children}
                </div>
            </div>,
            this.controller.getOverlay().current
        )
    }
}

export default withModalController(Modal)