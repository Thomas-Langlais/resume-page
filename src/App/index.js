import React, { Component } from 'react'
import { ParallaxBanner, withController } from 'react-scroll-parallax'

import Section from '../components/Section'
import Card from '../components/Card'
import Header from '../components/Header'
import Description from '../components/Description'
import Footer from '../components/Footer'
import FocusableTable from '../components/FocusableTable'

import Landing from '../assets/landing-overlay.jpg'
import AboutMe from '../assets/about-me-overlay.jpg'
import ContactMe from '../assets/contact-me-overlay.jpg'
import Me from '../assets/me.jpg'
import data from '../data/projects/data.json'

import './App.scss'

class App extends Component {

  constructor(props) {
    super(props)

    // this fixes the issue with cache image updating noted in the docs of the lib
    window.onload = () => {
      this.controller.update()
    }
  }

  render() {

    return (
      <div className="app">
        <div id='landing'>
          <ParallaxBanner 
            layers={[{
              image: Landing,
              amount: 0.15
            }]}
            style={{
              height: null,
              width: null
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
          </ParallaxBanner>
        </div>
        <div className='app__spacer'></div>
        <Section id='about-me'>
          <ParallaxBanner
            className='parallax-banner--header'
            layers={[{
              image: AboutMe,
              amount: 0.25
            }]}
            style={{
              height: null,
              width: null
            }}>
            <div className='app__content'>
              <Card subtitle noButton>
                <Header title='ABOUT ME' subtitle />
              </Card>
            </div>
          </ParallaxBanner>
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
        <Section id='work'>
          <ParallaxBanner
            className='parallax-banner--header'
            layers={[{
              image: AboutMe,
              amount: 0.25
            }]}
            style={{
              height: null,
              width: null
            }}>
            <div className='app__content'>
              <Card subtitle noButton>
                <Header title='Work' subtitle />
              </Card>
            </div>
          </ParallaxBanner>
          <div className='app__content'>
            <Description variant='header'>
              Here are the places that I have work within my time as a university student.<br />
              My experience has made me a smarter developer by using KISS (Keep It Simple Stupid)<br />
              Only develop features when needed, and abstract only when the requirements of the code changes.<br />
              These work terms have improved my skills as a software developer
            </Description>
            <div className='app__row'>
              <Card button='Read more' variant='font-spaced'>
                <Header title='Treasury Board of Canada Secretariat' />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Card>
              <Card button='Read more' variant='font-spaced'>
                <Header title="Mitel" />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Card>
              <Card button='Read more' variant='font-spaced'>
                <Header title="Ciena" />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Card>
            </div>
          </div>
        </Section>
        <Section id='projects'>
          <ParallaxBanner 
            className='parallax-banner--header'
            layers={[{
              image: AboutMe,
              amount: 0.25
            }]}
            style={{
              height: null,
              width: null
            }}>
            <div className='app__content'>
              <Card subtitle noButton>
                <Header title='Projects' subtitle subContent='and Hackathons' />
              </Card>
            </div>
          </ParallaxBanner>
          <FocusableTable className='app__content' data={data}/>
        </Section>
        <div id='contact-me'>
          <ParallaxBanner 
            layers={[{
              image: ContactMe,
              amount: 0.25
            }]}
            style={{
              height: null,
              width: null
            }}>
            <Section>
              <Card variant='font-spaced' noButton>
                <img src={Me} />
                <Header title='CONTACT ME' separator={false}/>
                <form className='contact-form' onSubmit={this.handleSubmit}>
                  <input className='contact-form__email' name='email' type='email' placeholder='Your email' />
                  <input className='contact-form__name' name='name' placeholder='Your name' />
                  <textarea className='contact-form__message' name='message' placeholder='Your message' />
                  <button className='contact-form__submit' type='submit'>Submit</button>
                </form>
              </Card>
            </Section>
          </ParallaxBanner>
        </div>
        <Footer />
      </div>
    );
  }

  get controller() {
    return this.props.parallaxController
  }

  handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
  }
}

export default withController(App);

/**
 * <Section id="personal-details">
          <div>Thomas L'anglais</div>
          <div>thomas1446@gmail.com</div>
          <div>Bachelor of Applied Science in Software Engineering</div>
          <div>University of Ottawa</div>
          <div>4<sup>th</sup> year</div>
        </Section>
        <Section id="work-experiences">
          <h3>Work Experience</h3>
          <div className="tabbed-entry two">
            <div>April - Dec 2018</div>
            <div>
              <strong>Treasury Board of Canada Secretariat</strong>, <span className="p-color">Software Developer/Analyst</span>
              <ul>
                <li>Developed an offline google form alternative using <strong>JavaScript</strong>, <strong>HTML5</strong> and <strong>CSS3</strong> to increase the productivity of analysts while maintaining internal security.</li>
                <li>Built a <strong>React/Redux</strong> web application which used a <strong>.NET Core 2.0</strong> server to host the creation and management of the offline form aforementioned.</li>
                <li>Developed software to streamline the process/workflow of manually exchanging documents within the government.</li>
              </ul>
            </div>
          </div>
          <div className="tabbed-entry two">
            <div>Sept - Dec 2017</div>
            <div>
              <strong>Mitel Networks Corporation</strong>, <span>Software Developer, MiContact Center</span>
              <ul>
                <li>Developed a REST API with <strong>.NET 4.5</strong> in <strong>C#</strong> to use the native <strong>Windows SQL Server</strong> instead of using the in-house cache to increase atomicity of common API calls.</li>
                <li>Implemented a solution to host a REST API that is only exposed locally on the machine.</li>
                <li>Developed solution to host the API internally without using <strong>IIS</strong> services.</li>
                <li>Developed solution to integrate services that were missing <strong>.NET Core</strong> process library.</li>
              </ul>
            </div>
          </div>
          <div className="tabbed-entry two">
            <div>Jan - April 2017</div>
            <div>
              <strong>CIENA Corporation</strong>, <span>Software Developer</span>
              <ul>
                <li>Improved <strong>REST API</strong> queries resulting in a decreased response time by 250ms.</li>
                <li>Created test suites using <strong>Postman</strong> in <strong>JavaScript</strong> to be used in TeamCity (CI).</li>
                <li>Worked in an <strong>Agile environment</strong> and actively participated in sprint planning meetings.</li>
                <li>Gained knowledge about microservices and <strong>Docker</strong> while working on the REST API.</li>
                <li>Developed solution to use the <strong>Java reflection</strong> library to implement validation on annotations.</li>
              </ul>
            </div>
          </div>
        </Section>
        <Section id="projects">
          <h3>Projects / Hackathons</h3>
          <div className="tabbed-entry two">
            <div>Feb 2018</div>
            <div>
              <strong>UOttaHack</strong>, <span>Hackathon - Message in a Bottle</span>
              <ul>
                <li>Built a social media <strong>Electron</strong> app that send messages anonymously and randomly.</li>
                <li>Used <strong>EC2</strong> storage to host the API, as well as other <strong>AWS</strong> services to complete the API</li>
              </ul>
            </div>
          </div>
          <div className="tabbed-entry two">
            <div>Sept - Dec 2018</div>
            <div>
              <strong>Architecture</strong>, <span>Project - Rently</span>
              <ul>
                <li>Built A web application with React and Firebase to rent out or rent a property.</li>
              </ul>
            </div>
          </div>
          <div className="tabbed-entry two">
            <div>Sept - Dec 2017</div>
            <div>
              <strong>Product Development</strong>, <span>Project - Fall Detection System</span>
              <ul>
                <li>Wearable tech that uses the <strong>Arduino SDK</strong> and a <strong>Raspberry Pi Zero</strong> to detect whether a patient in a hospital has fallen over.</li>
              </ul>
            </div>
          </div>
          <div className="tabbed-entry two">
            <div>Nov 2017</div>
            <div>
              <strong>Startup Weekend</strong>, <span>Hackathon - Peace of Mind (2<sup>nd</sup> place)</span>
              <ul>
                <li>Created a babysitting platform to facilitate the networking of parents and babysitters.</li>
              </ul>
            </div>
          </div>
          <div className="tabbed-entry two">
            <div>Sept - Dec 2016</div>
            <div>
              <strong>Software Development</strong>, <span>Project - LCB-GO</span>
              <ul>
                <li>An <strong>Android</strong> application that used <strong>Firebase</strong> to supply an alcohol delivery service in.</li>
              </ul>
            </div>
          </div>
        </Section>
        <Section id="technicals">
          <div className="flex-table col5 row2">
            <div className="flex-table__cell flex-table__head">Languages</div>
            <div className="flex-table__cell flex-table__foot">
              <div>Java</div>
              <div>C#</div>
              <div>JavaScript / TypeScript</div>
              <div>Python</div>
              <div>HTML5 / CSS3</div>
            </div>
            <div className="flex-table__cell flex-table__head">Frameworks</div>
            <div className="flex-table__cell flex-table__foot">
              <div>React</div>
              <div>NodeJs</div>
              <div>.Net 4.5 / 2.0 Core</div>
            </div>
            <div className="flex-table__cell flex-table__head">Libraries</div>
            <div className="flex-table__cell flex-table__foot">
              <div>PySpark</div>
              <div>TypeORM</div>
              <div>Firebase</div>
            </div>
            <div className="flex-table__cell flex-table__head">Testing</div>
            <div className="flex-table__cell flex-table__foot">
              <div>Postman</div>
              <div>Mocha</div>
              <div>Chai</div>
              <div>Junit</div>
            </div>
            <div className="flex-table__cell flex-table__head">Tools</div>
            <div className="flex-table__cell flex-table__foot">
              <div>PostgreSQL</div>
              <div>Windows SQL Server</div>
              <div>Docker</div>
            </div>
          </div>
        </Section>
        <Section id="hobbies-conferences">
          <h3>Hobbies and Conferences</h3>
          <ul>
            <li>Super Smash Bros</li>
            <li>Brooklyn-99</li>
            <li>Build Gundam model kits in free time.</li>
            <li>CUSEC 2016, 2018, 2019</li>
          </ul>
        </Section>
 */