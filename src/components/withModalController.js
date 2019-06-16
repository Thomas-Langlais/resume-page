import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ModalContext from '../context/ModalContext'

export default WrappedComponent => {
    class WithModalController extends Component {

        static propTypes = {
            modalController: PropTypes.object
        }

        render() {

            return (<ModalContext.Consumer>
            { controller =>
                <WrappedComponent modalController={controller} {...this.props} />
            }
            </ModalContext.Consumer>)
        }
    }

    return WithModalController
}