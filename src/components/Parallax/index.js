import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ParallaxContext from '../../helpers/ParallaxContext'

import './Parallax.scss'


// module.parallaxGlobalData = {
//   initNodesLoaded: false
// }

class Parallax extends Component {

  static contextType = ParallaxContext

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element),
    parallax: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  }

  // state = {
  //   loaded: false
  // }

  _parallaxable = null;

  constructor(props) {
    super(props)

    document.addEventListener('DOMContentLoaded', () => {
      const container = document.querySelector('.app')
      console.log('_parallaxable', this._parallaxable)
      console.log('container', container)
      console.log('this.context', this.context)
    })
  }

  componentDidMount() {
    this.element = this.context.createElement(this._getElementOptions())
  }

  componentWillUnmount() {
    this.context.removeElementById(this.element.id);
  }

  _getElementOptions() {
    return {
      parallaxItem: this._parallaxable,
      props: {
        parallax: this.props.parallax
      }
    }
  }

  render() {
    
    const { id, children, style } = this.props
    var { className = '' } = this.props

    if (className && className.length > 0) {
      className = 'parallax ' + className 
    } else {
      className = 'parallax'
    }

    return (<React.Fragment>
      <div id={id} className={className} style={style} ref={c => this._parallaxable = c}></div>
      {children}
    </React.Fragment>)
  }
}

// function initParallax(appContainer, item, parallax) {
//   let parallaxDetails = []
//   let sticky = false

//   // Edge requires a transform on the document body and a fixed position element
//   // in order for it to properly render the parallax effect as you scroll.
//   if (!module.parallaxGlobalData.initNodesLoaded) {
//     if (getComputedStyle(document.body).transform == 'none')
//       document.body.style.transform = 'translateZ(0)'
//     let fixedPos = document.createElement('div')
//     fixedPos.style.position = 'fixed'
//     fixedPos.style.top = '0'
//     fixedPos.style.width = '1px'
//     fixedPos.style.height = '1px'
//     fixedPos.style.zIndex = 1
//     document.body.insertBefore(fixedPos, document.body.firstChild)
//     module.parallaxGlobalData.initNodesLoaded = true
//   }
  
//   let container = item.parentNode

//   if (getComputedStyle(container).overflow != 'visible') {
//     console.error('Need non-scrollable container to apply perspective for', elem);
//     continue;
//   }
//   if (appContainer && container.parentNode != appContainer) {
//     console.warn('Currently we only track a single overflow clip, but elements from multiple clips found.', elem);
//   }
//   let appContainer = container.parentNode;
//   if (getComputedStyle(appContainer).overflow == 'visible') {
//     console.error('Parent of sticky container should be scrollable element', elem);
//   }

//   // TODO: update
//   let perspectiveElement;
//   if (sticky || getComputedStyle(appContainer).webkitOverflowScrolling) {
//     sticky = true;
//     perspectiveElement = container;
//   } else {
//     perspectiveElement = appContainer;
//     container.style.transformStyle = 'preserve-3d';
//   }
//   perspectiveElement.style.perspectiveOrigin = 'bottom right';
//   perspectiveElement.style.perspective = '1px';
//   if (sticky)
//     elem.style.position = '-webkit-sticky';
//   if (sticky)
//     elem.style.top = '0';
//   elem.style.transformOrigin = 'bottom right';

//   // Find the previous and next elements to parallax between.
//   let previousCover = parallax[i].previousElementSibling;
//   while (previousCover && previousCover.hasAttribute('parallax'))
//     previousCover = previousCover.previousElementSibling;
//   let nextCover = parallax[i].nextElementSibling;
//   while (nextCover && !nextCover.hasAttribute('parallax-cover'))
//     nextCover = nextCover.nextElementSibling;

//   parallaxDetails.push({'node': parallax[i],
//                         'top': parallax[i].offsetTop,
//                         'sticky': !!sticky,
//                         'nextCover': nextCover,
//                         'previousCover': previousCover});
// }

export default Parallax