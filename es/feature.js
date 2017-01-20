import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';

var Feature = function (_React$PureComponent) {
  _inherits(Feature, _React$PureComponent);

  function Feature() {
    _classCallCheck(this, Feature);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  Feature.prototype.render = function render() {
    return null;
  };

  return Feature;
}(React.PureComponent);

Feature.propTypes = {
  coordinates: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onEndHover: PropTypes.func,
  properties: PropTypes.object
};

export default Feature;