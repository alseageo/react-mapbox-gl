'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _Object$assign = _interopRequireDefault(_assign).default;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends = _interopRequireDefault(_extends2).default;

var _keys = require('babel-runtime/core-js/object/keys');

var _Object$keys = _interopRequireDefault(_keys).default;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck = _interopRequireDefault(_classCallCheck2).default;

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn = _interopRequireDefault(_possibleConstructorReturn2).default;

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits = _interopRequireDefault(_inherits2).default;

var _class, _temp2, _initialiseProps;

var _mapboxGl = require('mapbox-gl/dist/mapbox-gl.js');

var MapboxGl = _interopRequireDefault(_mapboxGl).default;

var _react = require('react');

var React = _interopRequireDefault(_react).default;

var Component = _react.Component;
var PropTypes = _react.PropTypes;

var _deepEqual = require('deep-equal');

var isEqual = _interopRequireDefault(_deepEqual).default;

var _mapboxGlStyleSpec = require('mapbox-gl-style-spec');

var diff = _mapboxGlStyleSpec.diff;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var events = {
  onStyleLoad: 'style.load', // Should remain first
  onResize: 'resize',
  onDblClick: 'dblclick',
  onClick: 'click',
  onMouseMove: 'mousemove',
  onMoveStart: 'mousestart',
  onMove: 'move',
  onMoveEnd: 'moveend',
  onMouseUp: 'mouseup',
  onDragStart: 'dragstart',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onZoomStart: 'zoomstart',
  onZoom: 'zoom',
  onZoomEnd: 'zoomend'
};

var ReactMapboxGl = (_temp2 = _class = function (_Component) {
  _inherits(ReactMapboxGl, _Component);

  function ReactMapboxGl() {
    var _temp, _this, _ret;

    _classCallCheck(this, ReactMapboxGl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  ReactMapboxGl.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _props = this.props,
        style = _props.style,
        hash = _props.hash,
        preserveDrawingBuffer = _props.preserveDrawingBuffer,
        accessToken = _props.accessToken,
        center = _props.center,
        pitch = _props.pitch,
        zoom = _props.zoom,
        minZoom = _props.minZoom,
        maxZoom = _props.maxZoom,
        maxBounds = _props.maxBounds,
        fitBounds = _props.fitBounds,
        fitBoundsOptions = _props.fitBoundsOptions,
        bearing = _props.bearing,
        scrollZoom = _props.scrollZoom,
        attributionPosition = _props.attributionPosition,
        interactive = _props.interactive,
        dragRotate = _props.dragRotate;


    MapboxGl.accessToken = accessToken;

    var map = new MapboxGl.Map({
      preserveDrawingBuffer: preserveDrawingBuffer,
      hash: hash,
      zoom: zoom[0],
      minZoom: minZoom,
      maxZoom: maxZoom,
      maxBounds: maxBounds,
      bearing: bearing,
      container: this.container,
      center: center,
      pitch: pitch,
      style: style,
      scrollZoom: scrollZoom,
      attributionControl: {
        position: attributionPosition
      },
      interactive: interactive,
      dragRotate: dragRotate
    });

    if (fitBounds) {
      map.fitBounds(fitBounds, fitBoundsOptions);
    }

    _Object$keys(events).forEach(function (event, index) {
      var propEvent = _this2.props[event];

      if (propEvent) {
        map.on(events[event], function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          propEvent.apply(undefined, [map].concat(args));

          if (index === 0) {
            _this2.setState({ map: map });
          }
        });
      }
    });
  };

  ReactMapboxGl.prototype.componentWillUnmount = function componentWillUnmount() {
    var map = this.state.map;


    if (map) {
      // Remove all events attached to the map
      map.off();

      // NOTE: We need to defer removing the map to after all children have unmounted
      setTimeout(function () {
        map.remove();
      });
    }
  };

  ReactMapboxGl.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextProps.children !== this.props.children || nextProps.containerStyle !== this.props.containerStyle || nextState.map !== this.state.map || nextProps.style !== this.props.style || nextProps.fitBounds !== this.props.fitBounds;
  };

  ReactMapboxGl.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var map = this.state.map;

    if (!map) {
      return null;
    }

    var center = map.getCenter();
    var zoom = map.getZoom();
    var bearing = map.getBearing();

    var didZoomUpdate = this.props.zoom !== nextProps.zoom && nextProps.zoom[0] !== zoom;

    var didCenterUpdate = this.props.center !== nextProps.center && (nextProps.center[0] !== center.lng || nextProps.center[1] !== center.lat);

    var didBearingUpdate = this.props.bearing !== nextProps.bearing && nextProps.bearing !== bearing;

    if (nextProps.fitBounds) {
      var fitBounds = this.props.fitBounds;


      var didFitBoundsUpdate = fitBounds !== nextProps.fitBounds || // Check for reference equality
      nextProps.fitBounds.length !== fitBounds && fitBounds.length || // Added element
      !!fitBounds.find(function (c, i) {
        // Check for equality
        var nc = nextProps.fitBounds[i];
        return c[0] !== nc[0] || c[1] !== nc[1];
      });

      if (didFitBoundsUpdate) {
        map.fitBounds(nextProps.fitBounds, nextProps.fitBoundsOptions);
      }
    }

    if (didZoomUpdate || didCenterUpdate || didBearingUpdate) {
      map[this.props.movingMethod]({
        zoom: didZoomUpdate ? nextProps.zoom[0] : zoom,
        center: didCenterUpdate ? nextProps.center : center,
        bearing: didBearingUpdate ? nextProps.bearing : bearing
      });
    }

    if (!isEqual(this.props.style, nextProps.style)) {
      var changes = diff(this.props.style, nextProps.style);
      console.log('changes are', changes); // eslint-disable-line
      try {
        changes.forEach(function (change) {
          if (change.command === 'setData') {
            var _change$args = change.args,
                sourceId = _change$args[0],
                geoJson = _change$args[1];

            map.getSource(sourceId).setData(geoJson);
          } else {
            map[change.command].apply(map, change.args);
          }
        });
      } catch (error) {
        // if we have any error with individual style changes, reload the full style
        map.setStyle(nextProps.style);
      }
    }

    return null;
  };

  ReactMapboxGl.prototype.render = function render() {
    var _this3 = this;

    var _props2 = this.props,
        containerStyle = _props2.containerStyle,
        children = _props2.children;
    var map = this.state.map;


    return React.createElement(
      'div',
      { ref: function ref(x) {
          _this3.container = x;
        }, style: containerStyle },
      map && children
    );
  };

  return ReactMapboxGl;
}(Component), _class.propTypes = _extends({}, _Object$keys(events).reduce(function (acc, event) {
  var _Object$assign2;

  return _Object$assign({}, acc, (_Object$assign2 = {}, _Object$assign2[event] = PropTypes.func, _Object$assign2));
}, {}), {

  // Main propTypes
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  accessToken: PropTypes.string.isRequired,
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.arrayOf(PropTypes.number),
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  maxBounds: PropTypes.array,
  fitBounds: PropTypes.array,
  fitBoundsOptions: PropTypes.object,
  bearing: PropTypes.number,
  pitch: PropTypes.number,
  containerStyle: PropTypes.object,
  hash: PropTypes.bool,
  preserveDrawingBuffer: PropTypes.bool,
  scrollZoom: PropTypes.bool,
  movingMethod: PropTypes.oneOf(['jumpTo', 'easeTo', 'flyTo']),
  attributionPosition: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  interactive: PropTypes.bool,
  dragRotate: PropTypes.bool
}), _class.defaultProps = {
  hash: false,
  onStyleLoad: function onStyleLoad() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return args;
  },
  preserveDrawingBuffer: false,
  center: [-0.2416815, 51.5285582],
  zoom: [11],
  minZoom: 0,
  maxZoom: 20,
  bearing: 0,
  scrollZoom: true,
  movingMethod: 'flyTo',
  pitch: 0,
  attributionPosition: 'bottom-right',
  interactive: true,
  dragRotate: true
}, _class.childContextTypes = {
  map: React.PropTypes.object
}, _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.state = {};

  this.getChildContext = function () {
    return {
      map: _this4.state.map
    };
  };
}, _temp2);
exports.default = ReactMapboxGl;
module.exports = exports['default'];