import React, { Component } from 'react'

import ParallaxContext from '../../helpers/ParallaxContext'
import ParallaxController from '../../classes/ParallaxController'

const createController = options => {
  return new ParallaxController(options)
}

class ParallaxProvider extends Component {
  
  constructor(props) {
    super(props)

    this.controller = createController({})
  }

  componentWillUnmount() {
    this.controller = this.controller.destroy();
  }

  render() {
    const { children } = this.props;

    return (
        <ParallaxContext.Provider value={this.controller}>
            {children}
        </ParallaxContext.Provider>
    );
  }
}

export default ParallaxProvider