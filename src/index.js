import _ from 'lodash';
import './home.js';
import './index.css';

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = '';

  return element;
}

document.body.appendChild(component());
