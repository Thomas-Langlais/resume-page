import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ParallaxContext from '../../helpers/ParallaxContext'
import ParallaxController from '../../classes/ParallaxController'

import './ParallaxProvider.scss'

const createController = options => {
  return new ParallaxController(options)
}

class ParallaxProvider extends Component {
  
  static propTypes = {
    scrollContainer: PropTypes.element,
    children: PropTypes.arrayOf(PropTypes.Element).isRequired
  }

  constructor(props) {
    super(props)

    let scrollContainer = this.props.scrollContainer;
    this.controller = createController({ scrollContainer})
  }

  componentWillUnmount() {
    this.controller = this.controller.destroy();
  }

  render() {
    const { children } = this.props;

    return (<div className='viewport'>
      <div>
        <ParallaxContext.Provider value={this.controller}>
          {children}
        </ParallaxContext.Provider>
      </div>
    </div>);
  }
}

export default ParallaxProvider