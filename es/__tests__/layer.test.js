import _jsx from 'babel-runtime/helpers/jsx';
import React from 'react';
import Layer from '../layer';
import TestUtils from 'react-addons-test-utils';
import { withContext } from 'recompose';

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