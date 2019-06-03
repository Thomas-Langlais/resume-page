import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCoffee,
  faHeart
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookSquare,
  faGithubSquare,
  faLinkedin,
  faReact  
} from '@fortawesome/free-brands-svg-icons'

import './Footer.scss'


const Footer = React.memo(() => {

  return (<footer className='footer'>
    <div className='footer__message'>
      Made with <FontAwesomeIcon icon={faCoffee} /> and <FontAwesomeIcon icon={faHeart} />
    </div>
    <div className='footer__react'>
      Powered with <FontAwesomeIcon className='footer__react-svg' icon={faReact} />
    </div>
    <div className='footer__links'>
      <FontAwesomeIcon icon={faGithubSquare} />
      <FontAwesomeIcon icon={faLinkedin} />
      <FontAwesomeIcon icon={faFacebookSquare} />
    </div>
  </footer>)
})

export default Footer