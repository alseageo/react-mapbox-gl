'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends = _interopRequireDefault(_extends2).default;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn = _interopRequireDefault(_possibleConstructorReturn2).default;

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits = _interopRequireDefault(_inherits2).default;

var _class, _temp2;

var _react = require('react');

var React = _interopRequireDefault(_react).default;

var PropTypes = _react.PropTypes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Source = (_temp2 = _class = function (_React$Component) {
  _inherits(Source, _React$Component);

  function Source() {
    var _temp, _this, _ret;

    _classCallCheck(this, Source);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.id = _this.props.id, _this.source = _extends({}, _this.props.sourceOptions), _temp), _possibleConstructorReturn(_this, _ret);
  }

  Source.prototype.componentWillMount = function componentWillMount() {
    var map = this.context.map;

    if (!map.getSource(this.id)) {
      map.addSource(this.id, this.source);
    }
  };

  Source.prototype.componentWillUnmount = function componentWillUnmount() {
    var map = this.context.map;

    if (map.getSource(this.id)) {
      map.removeSource(this.id);
    }
  };

  Source.prototype.render = function render() {
    return null;
  };

  return Source;
}(React.Component), _class.contextTypes = {
  map: PropTypes.object
}, _class.propTypes = {
  id: PropTypes.string.isRequired,
  sourceOptions: PropTypes.object
}, _temp2);
exports.default = Source;
module.exports = exports['default'];