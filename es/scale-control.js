import _extends from 'babel-runtime/helpers/extends';
import _jsx from 'babel-runtime/helpers/jsx';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _Object$keys from 'babel-runtime/core-js/object/keys';

var _class, _temp2;

import React, { Component, PropTypes } from 'react';

var scales = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2 * 1000, 5 * 1000, 10 * 1000];

var positions = {
  topRight: { top: 10, right: 10, bottom: 'auto', left: 'auto' },
  topLeft: { top: 10, left: 10, bottom: 'auto', right: 'auto' },
  bottomRight: { bottom: 10, right: 10, top: 'auto', left: 'auto' },
  bottomLeft: { bottom: 10, left: 10, top: 'auto', right: 'auto' }
};

var containerStyle = {
  position: 'absolute',
  zIndex: 10,
  boxShadow: '0px 1px 4px rgba(0, 0, 0, .3)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  right: 50,
  backgroundColor: '#fff',
  opacity: 0.85,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  padding: '3px 7px'
};

var scaleStyle = {
  border: '2px solid #7e8490',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, .3)',
  borderTop: 'none',
  height: 7,
  borderBottomLeftRadius: 1,
  borderBottomRightRadius: 1
};

var POSITIONS = _Object$keys(positions);

var MEASUREMENTS = ['km', 'mi'];

var MILE_IN_KILOMETERS = 1.60934;
var MILE_IN_FEET = 5280;
var KILOMETER_IN_METERS = 1000;

var MIN_WIDTH_SCALE = 40;

var ScaleControl = (_temp2 = _class = function (_Component) {
  _inherits(ScaleControl, _Component);

  function ScaleControl() {
    var _temp, _this, _ret;

    _classCallCheck(this, ScaleControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      chosenScale: false,
      scaleWidth: MIN_WIDTH_SCALE
    }, _this.setScale = function (map) {
      var measurement = _this.props.measurement;


      var clientWidth = map._canvas.clientWidth;

      var _map$getBounds = map.getBounds(),
          _ne = _map$getBounds._ne,
          _sw = _map$getBounds._sw;

      var totalWidth = _this._getDistanceTwoPoints([_sw.lng, _ne.lat], [_ne.lng, _ne.lat], measurement);

      var relativeWidth = totalWidth / clientWidth * MIN_WIDTH_SCALE;

      var chosenScale = scales.reduce(function (acc, curr) {
        return acc || curr > relativeWidth && curr;
      }, 0);
      var scaleWidth = chosenScale / totalWidth * map._canvas.width;

      _this.setState({
        chosenScale: chosenScale,
        scaleWidth: scaleWidth
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ScaleControl.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var map = this.context.map;

    this.setScale(map);

    map.on('zoomend', function () {
      _this2.setScale(map);
    });
  };

  ScaleControl.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.state.map) {
      this.state.map.off();
    }
  };

  ScaleControl.prototype._getDistanceTwoPoints = function _getDistanceTwoPoints(x, y) {
    var measurement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'km';
    var lng1 = x[0],
        lat1 = x[1];
    var lng2 = y[0],
        lat2 = y[1];

    // Radius of the earth in km or miles

    var R = measurement === 'km' ? 6371 : 6371 / MILE_IN_KILOMETERS;
    var dLat = this._deg2rad(lat2 - lat1);
    var dLng = this._deg2rad(lng2 - lng1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
  };

  ScaleControl.prototype._deg2rad = function _deg2rad(deg) {
    return deg * (Math.PI / 180);
  };

  ScaleControl.prototype._displayMeasurement = function _displayMeasurement(measurement, chosenScale) {
    if (chosenScale >= 1) {
      return chosenScale + ' ' + measurement;
    }

    if (measurement === 'mi') {
      return Math.floor(chosenScale * MILE_IN_FEET) + ' ft';
    }

    return Math.floor(chosenScale * KILOMETER_IN_METERS) + ' m';
  };

  ScaleControl.prototype.render = function render() {
    var _props = this.props,
        measurement = _props.measurement,
        style = _props.style,
        position = _props.position;
    var _state = this.state,
        chosenScale = _state.chosenScale,
        scaleWidth = _state.scaleWidth;


    return _jsx('div', {
      style: _extends({}, containerStyle, positions[position], style)
    }, void 0, _jsx('div', {
      style: _extends({}, scaleStyle, {
        width: scaleWidth
      })
    }, void 0), _jsx('div', {
      style: { paddingLeft: 10 }
    }, void 0, this._displayMeasurement(measurement, chosenScale)));
  };

  return ScaleControl;
}(Component), _class.contextTypes = {
  map: PropTypes.object
}, _class.propTypes = {
  measurement: PropTypes.oneOf(MEASUREMENTS),
  style: PropTypes.object,
  position: PropTypes.string
}, _class.defaultProps = {
  measurement: MEASUREMENTS[0],
  position: POSITIONS[2]
}, _temp2);
export { ScaleControl as default };