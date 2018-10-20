import React from 'react';
import ReactDOM from 'react-dom';
import {Section, Title, Card, CardList, Navbar, FadeScrollBar} from './components'
import './css/index.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        window.app = this;
        window.React = React;
    }

    render() {
        return (
            <Navbar>
                <Section navTitle="Hi!" id="intro">
                    <Title>Hello, I'm Thomas L'Anglais</Title>
                    <p>Welcome to my website!</p>
                    <p>On this page you will learn a bit about me, the work I've done, problems I solved, and more <b>NOTE - fix this when things are final</b></p>
                </Section>
                <FadeScrollBar />
                <Section navTitle="About me" id="whoami">
                    <Title>Who am I?</Title>
                    <p>I am a very stereotypical computer geek. I love building computers, playing games of all sort, 
                        I like geeking out over stuff like anime, tv shows, and 3d models.<br></br>
                        Here I will go into a little detail about myself.</p>
                    <CardList ref="cardlist1" className="col-3">
                        <Card title="Gaming">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed lectus vestibulum mattis. Consequat ac felis donec et odio pellentesque. Dui faucibus in ornare quam viverra orci sagittis eu. Cursus turpis massa tincidunt dui ut ornare. In massa tempor nec feugiat nisl. Amet commodo nulla facilisi nullam vehicula ipsum. Et egestas quis ipsum suspendisse. Suspendisse in est ante in nibh mauris cursus mattis. Urna duis convallis convallis tellus id interdum velit. Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed vulputate mi sit amet mauris commodo. Donec enim diam vulputate ut. Sit amet justo donec enim diam vulputate ut pharetra. Massa massa ultricies mi quis hendrerit. Sit amet consectetur adipiscing elit ut aliquam purus sit amet.</Card>
                        <Card title="Sports">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed lectus vestibulum mattis. Consequat ac felis donec et odio pellentesque. Dui faucibus in ornare quam viverra orci sagittis eu. Cursus turpis massa tincidunt dui ut ornare. In massa tempor nec feugiat nisl. Amet commodo nulla facilisi nullam vehicula ipsum. Et egestas quis ipsum suspendisse. Suspendisse in est ante in nibh mauris cursus mattis. Urna duis convallis convallis tellus id interdum velit. Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed vulputate mi sit amet mauris commodo. Donec enim diam vulputate ut. Sit amet justo donec enim diam vulputate ut pharetra. Massa massa ultricies mi quis hendrerit. Sit amet consectetur adipiscing elit ut aliquam purus sit amet.</Card>
                        <Card title="Hobbies">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed lectus vestibulum mattis. Consequat ac felis donec et odio pellentesque. Dui faucibus in ornare quam viverra orci sagittis eu. Cursus turpis massa tincidunt dui ut ornare. In massa tempor nec feugiat nisl. Amet commodo nulla facilisi nullam vehicula ipsum. Et egestas quis ipsum suspendisse. Suspendisse in est ante in nibh mauris cursus mattis. Urna duis convallis convallis tellus id interdum velit. Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed vulputate mi sit amet mauris commodo. Donec enim diam vulputate ut. Sit amet justo donec enim diam vulputate ut pharetra. Massa massa ultricies mi quis hendrerit. Sit amet consectetur adipiscing elit ut aliquam purus sit amet.</Card>
                        <Card title="Blah Blah">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed lectus vestibulum mattis. Consequat ac felis donec et odio pellentesque. Dui faucibus in ornare quam viverra orci sagittis eu. Cursus turpis massa tincidunt dui ut ornare. In massa tempor nec feugiat nisl. Amet commodo nulla facilisi nullam vehicula ipsum. Et egestas quis ipsum suspendisse. Suspendisse in est ante in nibh mauris cursus mattis. Urna duis convallis convallis tellus id interdum velit. Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed vulputate mi sit amet mauris commodo. Donec enim diam vulputate ut. Sit amet justo donec enim diam vulputate ut pharetra. Massa massa ultricies mi quis hendrerit. Sit amet consectetur adipiscing elit ut aliquam purus sit amet.</Card>
                    </CardList>
                </Section>
                <Section navTitle="My Work" id="work-experience">
                    <Title>My Work Experience.</Title>
                    <p>Here I will talk about all of the different work that I have currently done during my time as a student</p>
                    <CardList ref="cardlist2" className="col-6">
                        <Card title="Treasury Board and Secratariat of Canada">
                            <ul>
                                <li>Developed an e-form library for HTML5 based forms</li>
                                <li>Built a web application for building HTML/CSS3 e-forms to send to clients to collect data</li>
                                <li>Developed complex workflow based technology to stream line government processes to enhance productivity</li>
                            </ul>
                        </Card>
                        <Card title="Mitel Networks Corporation">
                            <ul>
                                <li>Developed an application to increase customer satisfaction by simplifying the customer journey</li>
                                <li>Increased developer and customer satisfaction by creating a REST API to reduce data errors</li>
                                <li>Learned the C# stack, which includes the .NET Framework, on the fly while working</li>
                            </ul>
                        </Card>
                        <Card title="CIENA Corporation">
                            <ul>
                                <li>Increased scalability / productivity of the Blue Planet web application by developing REST APIs</li>
                                <li>Used microservice technology to increase maintainability of the code base</li>
                                <li>Used Postman to affirm REST API functionality</li>
                            </ul>
                        </Card>
                    </CardList>
                </Section>
                <Section navTitle="Tools" id="tools">
                    <Title>Tools I've Used.</Title>
                    <p>Here are the things that I know how to use... (fix this later)</p>
                    <CardList ref="cardlist3" className="col-2">
                        <Card title="Java">aaa</Card>
                        <Card title="C#">aaa</Card>
                        <Card title="Python">aaa</Card>
                        <Card title="HTML5">aaa</Card>
                        <Card title="CSS3">aaa</Card>
                        <Card title="ES6">aaa</Card>
                    </CardList>
                    <p>Frameworks / Libraries</p>
                    <CardList ref="cardlist4" className="col-2">
                        <Card title="React">aaa</Card>
                        <Card title="jQuery">aaa</Card>
                        <Card title="Bootstrap">aaa</Card>
                    </CardList>
                    <p>Tools</p>
                    <CardList ref="cardlist5" className="col-2">
                        <Card title="GitHub / GitLab">aaa</Card>
                        <Card title="Databases">Postgres, MySQL, T-SQL, Cassandra</Card>
                        <Card title="Docker"></Card>
                    </CardList>
                    <p>Testing</p>
                    <CardList ref="cardlist6" className="col-4">
                        <Card title="Postman">aaa</Card>
                        <Card title="JUnit">aaa</Card>
                        <Card title="Mockito">aaa</Card>
                    </CardList>                    
                </Section>
                <Section navTitle="Projects" id="projects">
                    <Title>My Projects</Title>
                </Section>
                <Section id="contact-me">
                    <Title>Contact Me</Title>
                </Section>
            </Navbar>
        )
    }
}

window.ReactDOM = ReactDOM; //DEBUG
ReactDOM.render(<App />, document.getElementById('root'))

/*
TODO:add the rest

Mobile: (613) 608 9590
E-mail: thomas1446@gmail.com
Location: Ottawa, Ontario

LinkedIn: https://www.linkedin.com/in/thomas-l-anglais-939661109/

GitHub: https://github.com/Thomas-Langlais
GitLab: https://gitlab.com/Thomas-Langlais

Personal projects
    1. message in the bottle
    2. google drive ubuntu ting

Hackathons
    1. uOttaHack, feb 2018
    2. Startup Weekend Ottawa, Nov 2017

Volunteering FIXME: fix the actual resume to change helpped to helped
    Helped planned/organi zed as one of the directors for the First Year Integration Conference 2017
    Engineering 101 Week Guide, September 2016
*/