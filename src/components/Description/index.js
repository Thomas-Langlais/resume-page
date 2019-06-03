import React from 'react'
import PropTypes from 'prop-types'

import './Description.scss'

const Description = React.memo((props) => {

  const { children, variant = undefined } = props
  var className = 'description' + (variant ? ' description--' + variant : '')

  return (
    <div className={className}>
      {children}
    </div>
  )
});

Description.propTypes = {
  variant: PropTypes.oneOf(['header']),
  children: PropTypes.arrayOf(PropTypes.element)
}

export default Description