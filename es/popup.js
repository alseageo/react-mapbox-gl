import _jsx from 'babel-runtime/helpers/jsx';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp;

import React, { PropTypes } from 'react';
import ProjectedLayer from './projected-layer';
import { anchors, OverlayPropTypes } from './util/overlays';

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
export { Popup as default };