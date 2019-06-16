import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from '../Header';
import Modal from '../Modal';
import hasOverflown from '../../utils/hasOverflown'
import { shallowEqual } from '../../utils/equals'

import './Card.scss'

class Card extends Component {

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['font-spaced', 'constant-spaced']),
    title: PropTypes.string,
    subtitle: PropTypes.bool,
    freeContent: PropTypes.bool, // used to force the card content to not have a position and set overflow to visible
    expandable: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
    button: PropTypes.string,
    btnCb: PropTypes.func,
    onClick: PropTypes.func
  }

  state = {
    overflown: false,
    expanded: false
  }

  constructor(props) {
    super(props)

    window.addEventListener('resize', this._handleCard)
  }

  _handleCard = () => {
    
    const { cardContent } = this.refs
    this.setState({ overflown: hasOverflown(cardContent)})
  }

  _handleExpand = (res) => () => {
    this.setState({ expanded: res })
  }

  // method used to shut the modal
  _handleExit = () => {
    this.setState({ expanded: false})
  }

  componentDidUpdate() {

    this._handleCard()
  }

  componentDidMount() {

    this._handleCard()
  }

  shouldComponentUpdate(nextProps, nextState) {

    if (nextState.overflown !== this.state.overflown) {
      return true
    }

    if (nextState.expanded !== this.state.expanded) {
      return true
    }

    if (!shallowEqual(nextProps, this.props)) {
      return true
    }

    return false
  }

  render() {

    const { id, variant, title, children, subtitle, noButton, button, btnCb, onClick, expandable, freeContent } = this.props
    const { overflown, expanded } = this.state
    let className = 'card' + (this.props.className ? ' ' + this.props.className : '') + (subtitle ? ' card--subtitle' : '')


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

    let contentClassName = 'card__content'
    if (freeContent) contentClassName = `${contentClassName} card__content--free-content`

    let buttonElem
    if (expandable && overflown) {
      buttonElem = <div className='card__button' onClick={this._handleExpand(true)}>Read more</div>
    }
    if (!expandable && button) {
      buttonElem = <div className='card__button' onClick={btnCb}>{button}</div>
    }

    return (<React.Fragment>
      { expanded &&
      <Modal onExit={this._handleExit}>
        <div id={id} className={className} onClick={onClick}>
          { title && title.length > 0 && <Header title={title} />}
          <div className={contentClassName}>
            {children}
          </div>
        </div>
      </Modal>}
      <div id={id} className={className} onClick={onClick}>
        { title && title.length > 0 && <Header title={title} />}
        <div className={contentClassName} ref='cardContent'>
          {children}
        </div>
        { !noButton && (overflown && !expanded) && buttonElem }
      </div>
    </React.Fragment>)
  }
}

export default Card;