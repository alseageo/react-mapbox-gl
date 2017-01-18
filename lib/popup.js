'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx = _interopRequireDefault(_jsx2).default;

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

var anchors = _overlays.anchors;
var OverlayPropTypes = _overlays.OverlayPropTypes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = _jsx('div', {
  className: 'mapboxgl-popup-tip'
});

var Popup = (_temp = _class = function (_React$Component) {
  _inherits(Popup, _React$Component);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Popup.prototype.render = function render() {
    var _props = this.props,
        coordinates = _props.coordinates,
        anchor = _props.anchor,
        offset = _props.offset,
        onClick = _props.onClick,
        children = _props.children,
        style = _props.style;


    return _jsx(ProjectedLayer, {
      style: style,
      onClick: onClick,
      offset: offset,
      anchor: anchor,
      coordinates: coordinates,
      className: 'mapboxgl-popup mapboxgl-popup-anchor-' + anchor
    }, void 0, _ref, _jsx('div', {
      className: 'mapboxgl-popup-content'
    }, void 0, children));
  };

  return Popup;
}(React.Component), _class.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  anchor: OverlayPropTypes.anchor,
  offset: OverlayPropTypes.offset,
  children: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.object
}, _class.defaultProps = {
  anchor: anchors[0]
}, _temp);
exports.default = Popup;
module.exports = exports['default'];