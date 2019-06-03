import React from 'react'
import PropTypes from 'prop-types'

import './Header.scss'

const Header = React.memo((props) => {

  const { title = '', subtitle = false, subContent = '', separator = true } = props
  var className = 'header'
    + (subtitle ? ' header--subtitle' : '')
    + (!separator ? ' header--no-bar' : '')
    + (subContent.length > 0 ? ' header--sub-content' : '')

  return (
    <div className={className}>
      <div className='header__title'>
        {title}
        { subContent.length > 0 &&
        <div className='header__sub-content'>{subContent}</div>
        }
      </div>
    </div>
  )
})

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.bool,
  subContent: PropTypes.string,
  separator: PropTypes.bool
}

export default Header