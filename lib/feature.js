'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn = _interopRequireDefault(_possibleConstructorReturn2).default;

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits = _interopRequireDefault(_inherits2).default;

var _react = require('react');

var React = _interopRequireDefault(_react).default;

var PropTypes = _react.PropTypes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Feature = function (_React$PureComponent) {
  _inherits(Feature, _React$PureComponent);

  function Feature() {
    _classCallCheck(this, Feature);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  Feature.prototype.render = function render() {
    return null;
  };

  return Feature;
}(React.PureComponent);

Feature.propTypes = {
  coordinates: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onEndHover: PropTypes.func,
  properties: PropTypes.object
};

exports.default = Feature;
module.exports = exports['default'];