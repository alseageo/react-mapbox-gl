'use strict';

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx = _interopRequireDefault(_jsx2).default;

var _react = require('react');

var React = _interopRequireDefault(_react).default;

var _layer = require('../layer');

var Layer = _interopRequireDefault(_layer).default;

var _reactAddonsTestUtils = require('react-addons-test-utils');

var TestUtils = _interopRequireDefault(_reactAddonsTestUtils).default;

var _recompose = require('recompose');

var withContext = _recompose.withContext;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Layer', function () {
  var LayerWithContext = void 0;
  var addLayerMock = void 0;
  var addSourceMock = void 0;

  beforeEach(function () {
    addLayerMock = jest.fn();
    addSourceMock = jest.fn();

    LayerWithContext = withContext({
      map: React.PropTypes.object
    }, function () {
      return {
        map: {
          addSource: addSourceMock,
          addLayer: addLayerMock,
          on: jest.fn(),
          getSource: jest.fn().mockReturnValue({ setData: jest.fn() })
        }
      };
    })(Layer);
  });

  it('Should render layer with default options', function () {
    var LayerComponent = TestUtils.renderIntoDocument(_jsx(LayerWithContext, {
      children: [{ props: {} }]
    }));

    expect(addLayerMock.mock.calls[0]).toEqual([{
      id: 'layer-1',
      source: 'layer-1',
      type: 'symbol',
      layout: {},
      paint: {}
    }, undefined]);
  });

  it('Should render layer with default source', function () {
    var LayerComponent = TestUtils.renderIntoDocument(_jsx(LayerWithContext, {
      children: [{ props: {} }]
    }));

    expect(addSourceMock.mock.calls[0]).toEqual(['layer-2', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    }]);
  });
});