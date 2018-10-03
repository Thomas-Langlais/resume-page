import React from 'react';
import ReactDOM from 'react-dom';
import Section from './components/section';
import Title from './components/title';
import Card from './components/card';
import CardList from './components/cardlist';
import './css/index.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <Section id="intro">
                    <Title>Hello, I'm Thomas L'Anglais</Title>
                    <p>Welcome to my website!</p>
                    <p>On this page you will learn a bit about me, the work I've done, problems I solved, and more <b>NOTE - fix this when things are final</b></p>
                </Section>
                <Section id="whoami">
                    <Title>Who am I?</Title>
                    <p>I am a very stereotypical computer geek. I love building computers, playing games of all sort, 
                        I like geeking out over stuff like anime, tv shows, and 3d models.<br></br>
                        Here I will go into a little detail about myself.</p>
                    <CardList className="col-3">
                    <Card title="Gaming">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed lectus vestibulum mattis. Consequat ac felis donec et odio pellentesque. Dui faucibus in ornare quam viverra orci sagittis eu. Cursus turpis massa tincidunt dui ut ornare. In massa tempor nec feugiat nisl. Amet commodo nulla facilisi nullam vehicula ipsum. Et egestas quis ipsum suspendisse. Suspendisse in est ante in nibh mauris cursus mattis. Urna duis convallis convallis tellus id interdum velit. Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed vulputate mi sit amet mauris commodo. Donec enim diam vulputate ut. Sit amet justo donec enim diam vulputate ut pharetra. Massa massa ultricies mi quis hendrerit. Sit amet consectetur adipiscing elit ut aliquam purus sit amet.</Card>
                        <Card title="Sports">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed lectus vestibulum mattis. Consequat ac felis donec et odio pellentesque. Dui faucibus in ornare quam viverra orci sagittis eu. Cursus turpis massa tincidunt dui ut ornare. In massa tempor nec feugiat nisl. Amet commodo nulla facilisi nullam vehicula ipsum. Et egestas quis ipsum suspendisse. Suspendisse in est ante in nibh mauris cursus mattis. Urna duis convallis convallis tellus id interdum velit. Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed vulputate mi sit amet mauris commodo. Donec enim diam vulputate ut. Sit amet justo donec enim diam vulputate ut pharetra. Massa massa ultricies mi quis hendrerit. Sit amet consectetur adipiscing elit ut aliquam purus sit amet.</Card>
                        <Card title="Hobbies">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed lectus vestibulum mattis. Consequat ac felis donec et odio pellentesque. Dui faucibus in ornare quam viverra orci sagittis eu. Cursus turpis massa tincidunt dui ut ornare. In massa tempor nec feugiat nisl. Amet commodo nulla facilisi nullam vehicula ipsum. Et egestas quis ipsum suspendisse. Suspendisse in est ante in nibh mauris cursus mattis. Urna duis convallis convallis tellus id interdum velit. Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed vulputate mi sit amet mauris commodo. Donec enim diam vulputate ut. Sit amet justo donec enim diam vulputate ut pharetra. Massa massa ultricies mi quis hendrerit. Sit amet consectetur adipiscing elit ut aliquam purus sit amet.</Card>
                        <Card title="Blah Blah">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed lectus vestibulum mattis. Consequat ac felis donec et odio pellentesque. Dui faucibus in ornare quam viverra orci sagittis eu. Cursus turpis massa tincidunt dui ut ornare. In massa tempor nec feugiat nisl. Amet commodo nulla facilisi nullam vehicula ipsum. Et egestas quis ipsum suspendisse. Suspendisse in est ante in nibh mauris cursus mattis. Urna duis convallis convallis tellus id interdum velit. Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed vulputate mi sit amet mauris commodo. Donec enim diam vulputate ut. Sit amet justo donec enim diam vulputate ut pharetra. Massa massa ultricies mi quis hendrerit. Sit amet consectetur adipiscing elit ut aliquam purus sit amet.</Card>
                    </CardList>
                </Section>
                <Section id="work-experience">
                    <Title>My Work Experience.</Title>
                    <p>Here I will talk about all of the different work that I have currently done during my time as a student</p>
                    <CardList className="col-6">
                        <Card title="Treasury Board and Secratariat of Canada">I work here</Card>
                        <Card title="Mitel Networks Corporation">I worked here</Card>
                        <Card title="CIENA Corporation">I worked here last year</Card>
                        <Card title="Shared Services Canada">This was my first work term</Card>
                    </CardList>
                </Section>
                <Section id="tools">
                    <Title>Tools I've Used.</Title>
                    <p>Here I will </p>
                </Section>
                <Section id="projects">
                    <Title>My Projects</Title>
                </Section>
                <Section id="contact-me">
                    <Title>Contact Me</Title>
                </Section>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))