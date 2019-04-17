import React, { Component } from 'react';
import Section from './components/Section';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Section id="personal-details">
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
      </div>
    );
  }
}

export default App;
