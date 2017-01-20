'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overlayTransform = exports.overlayState = exports.OverlayPropTypes = exports.anchors = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _Object$assign = _interopRequireDefault(_assign).default;

var _mapboxGl = require('mapbox-gl/dist/mapbox-gl.js');

var LngLat = _mapboxGl.LngLat;
var Point = _mapboxGl.Point;

var _react = require('react');

var PropTypes = _react.PropTypes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var anchors = exports.anchors = ['center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];

var anchorTranslates = {
  center: 'translate(-50%,-50%)',
  top: 'translate(-50%,0)',
  left: 'translate(0,-50%)',
  right: 'translate(-100%,-50%)',
  bottom: 'translate(-50%,-100%)',
  'top-left': 'translate(0,0)',
  'top-right': 'translate(-100%,0)',
  'bottom-left': 'translate(0,-100%)',
  'bottom-right': 'translate(-100%,-100%)'
};

var defaultElement = { offsetWidth: 0, offsetHeight: 0 };

var isPointLike = function isPointLike(input) {
  return input instanceof Point || Array.isArray(input);
};

var projectCoordinates = function projectCoordinates(map, coordinates) {
  return map.project(LngLat.convert(coordinates));
};

var calculateAnchor = function calculateAnchor(map, offsets, position, _ref) {
  var offsetHeight = _ref.offsetHeight,
      offsetWidth = _ref.offsetWidth;

  var anchor = null;

  if (position.y + offsets.bottom.y - offsetHeight < 0) {
    anchor = [anchors[1]];
  } else if (position.y + offsets.top.y + offsetHeight > map.transform.height) {
    anchor = [anchors[2]];
  } else {
    anchor = [];
  }

  if (position.x < offsetWidth / 2) {
    anchor.push(anchors[3]);
  } else if (position.x > map.transform.width - offsetWidth / 2) {
    anchor.push(anchors[4]);
  }

  if (anchor.length === 0) {
    anchor = anchors[2];
  } else {
    anchor = anchor.join('-');
  }
  return anchor;
};

var normalizedOffsets = function normalizedOffsets(offset) {
  if (!offset) {
    return normalizedOffsets(new Point(0, 0));
  }

  if (typeof offset === 'number') {
    // input specifies a radius from which to calculate offsets at all positions
    var cornerOffset = Math.round(Math.sqrt(0.5 * Math.pow(offset, 2)));
    return {
      center: new Point(offset, offset),
      top: new Point(0, offset),
      bottom: new Point(0, -offset),
      left: new Point(offset, 0),
      right: new Point(-offset, 0),
      'top-left': new Point(cornerOffset, cornerOffset),
      'top-right': new Point(-cornerOffset, cornerOffset),
      'bottom-left': new Point(cornerOffset, -cornerOffset),
      'bottom-right': new Point(-cornerOffset, -cornerOffset)
    };
  }

  if (isPointLike(offset)) {
    // input specifies a single offset to be applied to all positions
    return anchors.reduce(function (res, anchor) {
      var tmp = _Object$assign({}, res);
      tmp[anchor] = Point.convert(offset);
      return tmp;
    }, {});
  }

  // input specifies an offset per position
  return anchors.reduce(function (res, anchor) {
    var tmp = _Object$assign({}, res);
    tmp[anchor] = Point.convert(offset[anchor] || [0, 0]);
    return tmp;
  }, {});
};

var OverlayPropTypes = exports.OverlayPropTypes = {
  anchor: PropTypes.oneOf(anchors),
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number), PropTypes.object])
};

var overlayState = exports.overlayState = function overlayState(props, map) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultElement,
      offsetWidth = _ref2.offsetWidth,
      offsetHeight = _ref2.offsetHeight;

  var position = projectCoordinates(map, props.coordinates);
  var offsets = normalizedOffsets(props.offset);
  var anchor = props.anchor || calculateAnchor(map, offsets, position, { offsetWidth: offsetWidth, offsetHeight: offsetHeight });

  return {
    anchor: anchor,
    position: position,
    offset: offsets[anchor]
  };
};

var moveTranslate = function moveTranslate(point) {
  return point ? 'translate(' + point.x + 'px,' + point.y + 'px)' : '';
};

var overlayTransform = exports.overlayTransform = function overlayTransform(args) {
  var anchor = args.anchor,
      position = args.position,
      offset = args.offset;

  var res = [moveTranslate(position)];

  if (offset && offset.x && offset.y) {
    res.push(moveTranslate(offset));
  }

  if (anchor) {
    res.push(anchorTranslates[anchor]);
  }

  return res;
};