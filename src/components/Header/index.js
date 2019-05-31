import React from 'react'
import PropTypes from 'prop-types'

import './Header.scss'

const Header = React.memo((props) => {

  const { title = '' } = props

  return (
    <div className='header'>
      <div className='header__title'>
        {title}
      </div>
      <div className='header__bar'></div>
    </div>
  )
})

Header.propTypes = {
  title: PropTypes.string
}

export default Header