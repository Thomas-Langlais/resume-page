import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withController from '../../helpers/withController'

import './Parallax.scss'

class Parallax extends Component {

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    header: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element),
    parallax: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  }

  _parallaxable = null;

  componentDidMount() {
    this.element = this.controller.createElement(this._getElementOptions())
  }

  componentWillUnmount() {
    this.context.removeElementById(this.element.id);
  }

  _getElementOptions() {
    return {
      parallaxItem: this._parallaxable,
      props: {
        parallax: this.props.parallax
      }
    }
  }

  get controller() {
    return this.props.parallaxController
  }

  render() {
    
    const { id, children, style, header } = this.props
    var { className = '' } = this.props

    if (className && className.length > 0) {
      className = 'parallax ' + className 
    } else {
      className = 'parallax'
    }
    if (header) className += ' parallax--header'

    return (<React.Fragment>
      <div id={id} className={className} style={style} ref={c => this._parallaxable = c}></div>
      {children}
    </React.Fragment>)
  }
}

export default withController(Parallax)