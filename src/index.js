import React from 'react'
import ReactDOM from 'react-dom'

import App from './App-test'
import * as serviceWorker from './serviceWorker'

import './index.scss'

ReactDOM.render(<App />, document.body);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
