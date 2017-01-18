import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

var _class, _temp2, _initialiseProps;

import React, { PropTypes } from 'react';
import { OverlayPropTypes, overlayState, overlayTransform, anchors } from './util/overlays';

var defaultStyle = {
  zIndex: 3
};

var ProjectedLayer = (_temp2 = _class = function (_React$Component) {
  _inherits(ProjectedLayer, _React$Component);

  function ProjectedLayer() {
    var _temp, _this, _ret;

    _classCallCheck(this, ProjectedLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  ProjectedLayer.prototype.componentDidMount = function componentDidMount() {
    var map = this.context.map;


    map.on('move', this.handleMapMove);
    // Now this.container is rendered and the size of container is known.
    // Recalculate the anchor/position
    this.handleMapMove();
  };

  ProjectedLayer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var coordinates = this.props.coordinates;


    if (coordinates[0] !== nextProps.coordinates[0] || coordinates[1] !== nextProps.coordinates[1]) {
      this.setState(overlayState(nextProps, this.context.map, this.container));
    }
  };

  ProjectedLayer.prototype.componentWillUnmount = function componentWillUnmount() {
    var map = this.context.map;


    this.prevent = true;

    map.off('move', this.handleMapMove);
  };

  ProjectedLayer.prototype.render = function render() {
    var _props = this.props,
        style = _props.style,
        children = _props.children,
        className = _props.className,
        onClick = _props.onClick,
        onMouseEnter = _props.onMouseEnter,
        onMouseLeave = _props.onMouseLeave;


    var finalStyle = _extends({}, defaultStyle, style, {
      transform: overlayTransform(this.state).join(' ')
    });

    return React.createElement(
      'div',
      {
        className: className,
        onClick: onClick,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        style: finalStyle,
        ref: this.setContainer },
      children
    );
  };

  return ProjectedLayer;
}(React.Component), _class.contextTypes = {
  map: PropTypes.object
}, _class.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  anchor: OverlayPropTypes.anchor,
  offset: OverlayPropTypes.offset,
  children: PropTypes.node,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  style: PropTypes.object
}, _class.defaultProps = {
  anchor: anchors[0],
  offset: 0,
  onClick: function onClick() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return args;
  }
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.state = {};

  this.setContainer = function (el) {
    if (el) {
      _this2.container = el;
    }
  };

  this.handleMapMove = function () {
    if (!_this2.prevent) {
      _this2.setState(overlayState(_this2.props, _this2.context.map, _this2.container));
    }
  };
}, _temp2);
export { ProjectedLayer as default };