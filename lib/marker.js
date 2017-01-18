'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends = _interopRequireDefault(_extends2).default;

var _assign = require('babel-runtime/core-js/object/assign');

var _Object$assign = _interopRequireDefault(_assign).default;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn = _interopRequireDefault(_possibleConstructorReturn2).default;

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits = _interopRequireDefault(_inherits2).default;

var _class, _temp;

var _react = require('react');

var React = _interopRequireDefault(_react).default;

var PropTypes = _react.PropTypes;

var _projectedLayer = require('./projected-layer');

var ProjectedLayer = _interopRequireDefault(_projectedLayer).default;

var _overlays = require('./util/overlays');

var OverlayPropTypes = _overlays.OverlayPropTypes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propsToRemove = { children: undefined };

var Marker = (_temp = _class = function (_React$Component) {
  _inherits(Marker, _React$Component);

  function Marker() {
    _classCallCheck(this, Marker);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Marker.prototype.render = function render() {
    var children = this.props.children;

    var nestedProps = _Object$assign({}, this.props, propsToRemove);

    return React.createElement(
      ProjectedLayer,
      _extends({}, nestedProps, {
        className: 'mapboxgl-marker' }),
      children
    );
  };

  return Marker;
}(React.Component), _class.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  anchor: OverlayPropTypes.anchor,
  offset: OverlayPropTypes.offset,
  children: PropTypes.node,
  style: PropTypes.object
}, _temp);
exports.default = Marker;
module.exports = exports['default'];