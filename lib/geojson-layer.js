'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _Object$keys = _interopRequireDefault(_keys).default;

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

var _deepEqual = require('deep-equal');

var isEqual = _interopRequireDefault(_deepEqual).default;

var _diff = require('./util/diff');

var diff = _interopRequireDefault(_diff).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = 0;
var generateID = function generateID() {
  var newId = index + 1;
  index = newId;
  return index;
};

var GeoJSONLayer = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(GeoJSONLayer, _React$PureComponent);

  function GeoJSONLayer() {
    var _temp, _this, _ret;

    _classCallCheck(this, GeoJSONLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.id = _this.props.id || 'geojson-' + generateID(), _this.source = _extends({
      type: 'geojson'
    }, _this.props.sourceOptions, {
      data: _this.props.data
    }), _this.layerIds = [], _this.createLayer = function (type) {
      var _this2 = _this,
          id = _this2.id,
          layerIds = _this2.layerIds;
      var before = _this.props.before;
      var map = _this.context.map;


      var layerId = id + '-' + type;
      layerIds.push(layerId);

      var paint = _this.props[type + 'Paint'] || {};
      var layout = _this.props[type + 'Layout'] || {};

      map.addLayer({
        id: layerId,
        source: id,
        type: type,
        paint: paint,
        layout: layout
      }, before);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  GeoJSONLayer.prototype.componentWillMount = function componentWillMount() {
    var id = this.id,
        source = this.source;
    var map = this.context.map;


    map.addSource(id, source);

    this.createLayer('symbol');
    this.createLayer('line');
    this.createLayer('fill');
    this.createLayer('circle');
  };

  GeoJSONLayer.prototype.componentWillUnmount = function componentWillUnmount() {
    var id = this.id,
        layerIds = this.layerIds;
    var map = this.context.map;


    map.removeSource(id);

    layerIds.forEach(function (key) {
      return map.removeLayer(key);
    });
  };

  GeoJSONLayer.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    var _this3 = this;

    var id = this.id;
    var _props = this.props,
        data = _props.data,
        paint = _props.paint,
        layout = _props.layout;
    var map = this.context.map;


    if (!isEqual(props.paint, paint)) {
      (function () {
        var paintDiff = diff(paint, props.paint);

        _Object$keys(paintDiff).forEach(function (key) {
          map.setPaintProperty(_this3.id, key, paintDiff[key]);
        });
      })();
    }

    if (!isEqual(props.layout, layout)) {
      (function () {
        var layoutDiff = diff(layout, props.layout);

        _Object$keys(layoutDiff).forEach(function (key) {
          map.setLayoutProperty(_this3.id, key, layoutDiff[key]);
        });
      })();
    }

    if (props.data !== data) {
      map.getSource(id).setData(props.data);
    }
  };

  GeoJSONLayer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.paint, this.props.paint) || !isEqual(nextProps.layout, this.props.layout) || nextProps.data !== this.props.data;
  };

  GeoJSONLayer.prototype.render = function render() {
    return null;
  };

  return GeoJSONLayer;
}(React.PureComponent), _class.contextTypes = {
  map: PropTypes.object
}, _class.propTypes = {
  id: PropTypes.string,

  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,

  lineLayout: PropTypes.object,
  symbolLayout: PropTypes.object,
  circleLayout: PropTypes.object,
  fillLayout: PropTypes.object,

  linePaint: PropTypes.object,
  symbolPaint: PropTypes.object,
  circlePaint: PropTypes.object,
  fillPaint: PropTypes.object,

  sourceOptions: PropTypes.string,
  before: PropTypes.string
}, _temp2);
exports.default = GeoJSONLayer;
module.exports = exports['default'];