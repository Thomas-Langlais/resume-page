import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Section from './components'

class App extends React.Component {
    render() {
        return (
            <div>
                <Section idProp="intro" title="Hello, you hoe"/>
                <Section idProp="whoami" title="Who Am I"/>
                <Section idProp="work-experience" title="Work Experience"/>
                <Section idProp="tools" title="Tools Used" />
                <Section idProp="projects" title="Projects"/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))