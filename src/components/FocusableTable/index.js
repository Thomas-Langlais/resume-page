import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './FocusableTable.scss'

class FocusableTable extends Component {

  static propTypes = {
    className: PropTypes.string
  }

  render() {

    return (<div className='focusable-table'>
    </div>)
  }
}

export default FocusableTable