'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof = _interopRequireDefault(_typeof2).default;

exports.default = injectCSS;

var _css = require('../constants/css');

var cssRules = _interopRequireDefault(_css).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function injectCSS(window) {
  if (window && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.document) {
    var document = window.document;

    var head = document.head || document.getElementsByTagName('head')[0];

    var styleElement = document.createElement('style');
    styleElement.innerHTML = cssRules;
    head.appendChild(styleElement);
  }
}
module.exports = exports['default'];