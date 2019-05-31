import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Parallax.scss'

class Parallax extends Component {

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element),
    parallax: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  }

  defaultProps = {
    id: ''
  }

  render() {
    
    const { id, children, style } = this.props
    var { className = '' } = this.props

    if (className && className.length > 0) {
      className = 'parallax ' + className 
    } else {
      className = 'parallax'
    }

    return (
      <div id={id} className={className} style={style}>
        {children}
      </div>
    )
  }
}

export default Parallax