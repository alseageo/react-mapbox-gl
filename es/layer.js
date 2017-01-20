import _Object$keys from 'babel-runtime/core-js/object/keys';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp2;

import React, { PropTypes } from 'react';
import isEqual from 'deep-equal';
import diff from './util/diff';

var index = 0;
var generateID = function generateID() {
  var newId = index + 1;
  index = newId;
  return index;
};

var Layer = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(Layer, _React$PureComponent);

  function Layer() {
    var _temp, _this, _ret;

    _classCallCheck(this, Layer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.hover = [], _this.id = _this.props.id || 'layer-' + generateID(), _this.source = _extends({
      type: 'geojson'
    }, _this.props.sourceOptions, {
      data: {
        type: 'FeatureCollection',
        features: []
      }
    }), _this.geometry = function (coordinates) {
      switch (_this.props.type) {
        case 'symbol':
        case 'circle':
          return {
            type: 'Point',
            coordinates: coordinates
          };

        case 'fill':
          return {
            type: coordinates.length > 1 ? 'MultiPolygon' : 'Polygon',
            coordinates: coordinates
          };

        case 'line':
          return {
            type: 'LineString',
            coordinates: coordinates
          };

        default:
          return null;
      }
    }, _this.feature = function (props, id) {
      return {
        type: 'Feature',
        geometry: _this.geometry(props.coordinates),
        properties: _extends({}, props.properties, {
          id: id
        })
      };
    }, _this.onClick = function (evt) {
      var children = [].concat(_this.props.children);
      var map = _this.context.map;
      var _this2 = _this,
          id = _this2.id;

      var features = map.queryRenderedFeatures(evt.point, { layers: [id] });

      features.forEach(function (feature) {
        var properties = feature.properties;

        var child = children[properties.id];

        var onClick = child && child.props.onClick;
        if (onClick) {
          onClick(_extends({}, evt, { feature: feature, map: map }));
        }
      });
    }, _this.onMouseMove = function (evt) {
      var children = [].concat(_this.props.children);
      var map = _this.context.map;
      var _this3 = _this,
          id = _this3.id;


      var oldHover = _this.hover;
      var hover = [];

      var features = map.queryRenderedFeatures(evt.point, { layers: [id] });

      features.forEach(function (feature) {
        var properties = feature.properties;

        var child = children[properties.id];
        hover.push(properties.id);

        var onHover = child && child.props.onHover;
        if (onHover) {
          onHover(_extends({}, evt, { feature: feature, map: map }));
        }
      });

      oldHover.filter(function (prevHoverId) {
        return hover.indexOf(prevHoverId) === -1;
      }).forEach(function (key) {
        var onEndHover = children[key] && children[key].props.onEndHover;
        if (onEndHover) {
          onEndHover(_extends({}, evt, { map: map }));
        }
      });

      _this.hover = hover;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Layer.prototype.componentWillMount = function componentWillMount() {
    var id = this.id,
        source = this.source;
    var _props = this.props,
        type = _props.type,
        layout = _props.layout,
        paint = _props.paint,
        layerOptions = _props.layerOptions,
        sourceId = _props.sourceId,
        before = _props.before;
    var map = this.context.map;


    var layer = _extends({
      id: id,
      source: sourceId || id,
      type: type,
      layout: layout,
      paint: paint
    }, layerOptions);

    if (!sourceId) {
      map.addSource(id, source);
    }

    map.addLayer(layer, before);

    map.on('click', this.onClick);
    map.on('mousemove', this.onMouseMove);
  };

  Layer.prototype.componentWillUnmount = function componentWillUnmount() {
    var id = this.id;
    var map = this.context.map;


    map.removeLayer(id);
    // if pointing to an existing source, don't remove
    // as other layers may be dependent upon it
    if (!this.props.sourceId) {
      map.removeSource(id);
    }

    map.off('click', this.onClick);
    map.off('mousemove', this.onMouseMove);
  };

  Layer.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    var _this4 = this;

    var _props2 = this.props,
        paint = _props2.paint,
        layout = _props2.layout;
    var map = this.context.map;


    if (!isEqual(props.paint, paint)) {
      (function () {
        var paintDiff = diff(paint, props.paint);

        _Object$keys(paintDiff).forEach(function (key) {
          map.setPaintProperty(_this4.id, key, paintDiff[key]);
        });
      })();
    }

    if (!isEqual(props.layout, layout)) {
      (function () {
        var layoutDiff = diff(layout, props.layout);

        _Object$keys(layoutDiff).forEach(function (key) {
          map.setLayoutProperty(_this4.id, key, layoutDiff[key]);
        });
      })();
    }
  };

  Layer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.children, this.props.children) || !isEqual(nextProps.paint, this.props.paint) || !isEqual(nextProps.layout, this.props.layout);
  };

  Layer.prototype.render = function render() {
    var _this5 = this;

    var map = this.context.map;


    if (this.props.children) {
      var children = [].concat(this.props.children);

      var features = children.map(function (_ref, id) {
        var props = _ref.props;
        return _this5.feature(props, id);
      }).filter(Boolean);

      var source = map.getSource(this.props.sourceId || this.id);
      source.setData({
        type: 'FeatureCollection',
        features: features
      });
    }

    return null;
  };

  return Layer;
}(React.PureComponent), _class.contextTypes = {
  map: PropTypes.object
}, _class.propTypes = {
  id: PropTypes.string,

  type: PropTypes.oneOf(['symbol', 'line', 'fill', 'circle', 'raster']),

  layout: PropTypes.object,
  paint: PropTypes.object,
  sourceOptions: PropTypes.object,
  layerOptions: PropTypes.object,
  sourceId: PropTypes.string,
  before: PropTypes.string
}, _class.defaultProps = {
  type: 'symbol',
  layout: {},
  paint: {}
}, _temp2);
export { Layer as default };