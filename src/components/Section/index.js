import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Section.scss';

class Section extends Component {

  defaultProps = {
    id: ''
  }
  
  static propTypes = {
    id: PropTypes.string
  }

  render() {

    const { id, children} = this.props
    var { className } = this.props

    if (className && className.length > 0) {
      className = 'section ' + className
    } else {
      className = 'section'
    }

    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }
}

export default Section;