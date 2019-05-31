import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Card.scss'

class Card extends Component {

  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element),
    button: PropTypes.oneOfType([PropTypes.string, null]),
    btnCb: PropTypes.func
  }

  render() {

    const { id, children, button, btnCb } = this.props

    return (
      <div id={id} className='card'>
        <div className='card__content'>
          {children}
        </div>
        <div className='card__button' onClick={btnCb}>
          {button}
        </div>
      </div>
    );
  }
}

export default Card;