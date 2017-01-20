import _extends from 'babel-runtime/helpers/extends';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp;

import React, { PropTypes } from 'react';
import ProjectedLayer from './projected-layer';
import { OverlayPropTypes } from './util/overlays';

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
export { Marker as default };