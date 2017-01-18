'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _Object$keys = _interopRequireDefault(_keys).default;

var _reduceObject = require('reduce-object');

var reduce = _interopRequireDefault(_reduceObject).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var find = function find(obj, predicate) {
  return _Object$keys(obj).find(function (key) {
    return predicate(obj[key], key);
  });
};

var diff = function diff(obj1, obj2) {
  return reduce(obj2, function (res, value, key) {
    var toMutate = res;
    if (find(obj1, function (v, k) {
      return key === k && value !== v;
    })) {
      toMutate[key] = value;
    }
    return toMutate;
  }, {});
};

exports.default = diff;
module.exports = exports['default'];