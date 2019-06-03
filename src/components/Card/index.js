import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Card.scss'

class Card extends Component {

  static propTypes = {
    id: PropTypes.string,
    variant: PropTypes.oneOf(['font-spaced', 'constant-spaced']),
    subtitle: PropTypes.bool,
    noContent: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element),
    button: PropTypes.oneOfType([PropTypes.string, null]),
    btnCb: PropTypes.func
  }

  render() {

    const { id, variant, subtitle, noButton, children, button, btnCb } = this.props
    var className = 'card' + (subtitle ? ' card--subtitle' : '')

    switch (variant) {
      case 'font-spaced':
        className += ' card--font-spaced'
        break;
      case 'constant-spaced':
        className += ' card--constant-spaced'
        break;
      default:
        break;
    }

    return (
      <div id={id} className={className}>
        <div className='card__content'>
          {children}
        </div>
        { !noButton &&
        <div className='card__button' onClick={btnCb}>
          {button}
        </div>
        }
      </div>
    );
  }
}

export default Card;