import _Object$keys from 'babel-runtime/core-js/object/keys';
import reduce from 'reduce-object';

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

export default diff;