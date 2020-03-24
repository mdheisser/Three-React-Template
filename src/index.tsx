import React from 'react';
import { render } from 'react-dom'
import './index.css';
import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { App } from './App';

if (WEBGL.isWebGL2Available() === false) {

    document.body.appendChild(WEBGL.getWebGL2ErrorMessage());

}

render(<App />, document.getElementById('root'));

// import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();