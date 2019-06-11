import React from 'react'
import PropTypes from 'prop-types'

import Section from '../components/Section'
import Card from '../components/Card'
import ParallaxProvider from '../components/ParallaxProvider'
import Parallax from '../components/Parallax'
import Header from '../components/Header'
import Description from '../components/Description'

import Landing from '../assets/landing-overlay.jpg'
import AboutMe from '../assets/about-me-overlay.jpg'

import './App.scss'

const App = (props) => {
  return <ParallaxProvider scrollContainer={props.container}>
    <Parallax id='landing' parallax={0.3} style={{
      backgroundImage: `url(${Landing})`
    }}></Parallax>
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
    <div className='app__spacer'></div>
    <Parallax header id='about-me' parallax={0.3} style={{
      backgroundImage: `url(${AboutMe})`
    }}></Parallax>
    <div className='app__content'>
      <Card subtitle noButton>
        <Header title='ABOUT ME' subtitle />
      </Card>
    </div>
    <Section>
      <div className='app__content'>
        <Description variant='header'>
          Here are some facts about me.<br />
          I hope you find what you are looking for.
        </Description>
        <div className='app__row'>
          <Card button='Read more' variant='font-spaced'>
            <Header title='A Young Software Developer' />
            I am following my dreams of being a software developer, always learning new things to keep it up with new emerging technology
          </Card>
          <Card button='Read more' variant='font-spaced'>
            <Header title="Me - Thomas L'Anglais" />
            I like to kick it with my friends and colleages and have a good time enjoying the simple pleasures of life.<br />
            Like having a beer and playing board games, all while sharing funny moments.
          </Card>
          <Card button='Read more' variant='font-spaced'>
            <Header title="My Aspirations" />
            One professional aspiration I have right now is to create a project from start to finish. Mainly because I want to be able to showcase my accomplishment to prove that I am a proper software developer<br />
            Other things that I wish to do in life are:<br />
            Create a work desk from start to finish, Travel across the globe with my friends, and ONE MORE THING, come back later
          </Card>
        </div>
      </div>
    </Section>
  </ParallaxProvider>
}

App.propTypes = {
  container: PropTypes.element.isRequired
}

export default App