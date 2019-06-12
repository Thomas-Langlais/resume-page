import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withController } from 'react-scroll-parallax'

// left over from fiddling with the parallax lib, we may need this for lazy loading images later...
// keeping for now
class Image extends Component {

    static propTypes = {
        className: PropTypes.string,
        src: PropTypes.string,
        alt: PropTypes.string,
        style: PropTypes.object
    }

    _handleLoad = () => {
        this.props.parallaxController.update()
    }

    render() {

        const { className, src, style, alt } = this.props

        return <img className={className} alt={alt} src={src} style={style} onLoad={this._handleLoad} />
    }
}

export default withController(Image)