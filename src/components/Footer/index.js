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
      <a rel='author noopener noreferrer' target='_blank' href='https://github.com/Thomas-Langlais'>
        <FontAwesomeIcon icon={faGithubSquare} />
      </a>
      <a rel='author noopener noreferrer' target='_blank' href='https://www.linkedin.com/in/thomas-l-anglais-939661109/'>
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a rel='author noopener noreferrer' target='_blank' href='https://www.facebook.com/thomas.langlais1'>
        <FontAwesomeIcon icon={faFacebookSquare} />
      </a>
    </div>
  </footer>)
})

export default Footer