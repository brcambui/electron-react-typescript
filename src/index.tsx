import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './ui/app';
import Splash from './ui/splash';

/**
 * Defines which view will be rendered in the root node.
 * This value is obtained by the query parameter "view".
 * @example http://localhost:3000/?view=splash
 */
const whichView = new URLSearchParams(window.location.search).get('view');

/** Component to be rendered into the root node. */
let component: ReactElement = (<></>);

switch (whichView) {

  case 'splash':
    component = <Splash />;
    break;

  default:
  case 'main':
    component = <App />;
    break;

}

ReactDOM.render(component, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
