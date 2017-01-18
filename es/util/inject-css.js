import _typeof from 'babel-runtime/helpers/typeof';
import cssRules from '../constants/css';

export default function injectCSS(window) {
  if (window && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.document) {
    var document = window.document;

    var head = document.head || document.getElementsByTagName('head')[0];

    var styleElement = document.createElement('style');
    styleElement.innerHTML = cssRules;
    head.appendChild(styleElement);
  }
}