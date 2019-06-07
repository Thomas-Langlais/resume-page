import React, { Component } from 'react'

import Section from '../components/Section'
import Card from '../components/Card'
import ParallaxProvider from '../components/ParallaxProvider'
import Parallax from '../components/Parallax'
import Header from '../components/Header'

import Landing from '../assets/landing-overlay.jpg'

import './App.scss'

const App = () => {
  return <ParallaxProvider>
    <Parallax id='landing' parallax={0.3} style={{
      backgroundImage: `url(${Landing})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Section>
        <Card button='Contact Me' variant='font-spaced'>
          <Header title='WELCOME' />
          <div className='app__message app__message--landing'>
            Welcome to my website!<br/>
            I hope that whoever you are, that your day is going well.<br/>
            Here you’ll find some information about myself.<br/>
            If you wish to get in contact with me, please fill out the form below.<br/><br/>
            Cheers, Thomas L’Anglais
          </div>
        </Card>
      </Section>
    </Parallax>
    <div className='app__spacer'></div>
  </ParallaxProvider>
}

export default App