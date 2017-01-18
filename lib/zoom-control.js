'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends = _interopRequireDefault(_extends2).default;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx = _interopRequireDefault(_jsx2).default;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn = _interopRequireDefault(_possibleConstructorReturn2).default;

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits = _interopRequireDefault(_inherits2).default;

var _keys = require('babel-runtime/core-js/object/keys');

var _Object$keys = _interopRequireDefault(_keys).default;

var _class, _temp2;

var _react = require('react');

var React = _interopRequireDefault(_react).default;

var Component = _react.Component;
var PropTypes = _react.PropTypes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containerStyle = {
  position: 'absolute',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, .3)',
  border: '1px solid rgba(0, 0, 0, 0.1)'
};

var positions = {
  topRight: { top: 10, right: 10, bottom: 'auto', left: 'auto' },
  topLeft: { top: 10, left: 10, bottom: 'auto', right: 'auto' },
  bottomRight: { bottom: 10, right: 10, top: 'auto', left: 'auto' },
  bottomLeft: { bottom: 10, left: 10, top: 'auto', right: 'auto' }
};

var buttonStyle = {
  backgroundColor: '#f9f9f9',
  opacity: 0.95,
  transition: 'background-color 0.16s ease-out',
  cursor: 'pointer',
  border: 0,
  height: 26,
  width: 26,
  backgroundImage: "url('https://api.mapbox.com/mapbox.js/v2.4.0/images/icons-000000@2x.png')",
  backgroundPosition: '0px 0px',
  backgroundSize: '26px 260px',
  outline: 0
};

var buttonStyleHovered = {
  backgroundColor: '#fff',
  opacity: 1
};

var buttonStylePlus = {
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  borderTopLeftRadius: 2,
  borderTopRightRadius: 2
};

var buttonStyleMinus = {
  backgroundPosition: '0px -26px',
  borderBottomLeftRadius: 2,
  borderBottomRightRadius: 2
};

var PLUS = 0,
    MINUS = 1;

var POSITIONS = _Object$keys(positions);

var ZoomControl = (_temp2 = _class = function (_Component) {
  _inherits(ZoomControl, _Component);

  function ZoomControl() {
    var _temp, _this, _ret;

    _classCallCheck(this, ZoomControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      hover: undefined
    }, _this.onMouseAction = function (hover) {
      if (hover !== _this.state.hover) {
        _this.setState({ hover: hover });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ZoomControl.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        onControlClick = _props.onControlClick,
        zoomDiff = _props.zoomDiff,
        position = _props.position,
        style = _props.style;
    var hover = this.state.hover;
    var map = this.context.map;


    return _jsx('div', {
      style: _extends({}, containerStyle, positions[position], style)
    }, void 0, _jsx('button', {
      style: _extends({}, buttonStyle, buttonStylePlus, hover === PLUS && buttonStyleHovered),
      onMouseOver: function onMouseOver() {
        return _this2.onMouseAction(PLUS);
      },
      onMouseOut: this.onMouseAction,
      onClick: function onClick() {
        return onControlClick(map, zoomDiff);
      }
    }, void 0), _jsx('button', {
      style: _extends({}, buttonStyle, buttonStyleMinus, hover === MINUS && buttonStyleHovered),
      onMouseOver: function onMouseOver() {
        return _this2.onMouseAction(MINUS);
      },
      onMouseOut: this.onMouseAction,
      onClick: function onClick() {
        return onControlClick(map, -zoomDiff);
      }
    }, void 0));
  };

  return ZoomControl;
}(Component), _class.propTypes = {
  zoomDiff: PropTypes.number,
  onControlClick: PropTypes.func,
  position: PropTypes.oneOf(POSITIONS),
  style: PropTypes.object
}, _class.defaultProps = {
  position: POSITIONS[0],
  zoomDiff: 0.5,
  onControlClick: function onControlClick(map, zoomDiff) {
    map.zoomTo(map.getZoom() + zoomDiff);
  }
}, _class.contextTypes = {
  map: PropTypes.object
}, _temp2);
exports.default = ZoomControl;
module.exports = exports['default'];