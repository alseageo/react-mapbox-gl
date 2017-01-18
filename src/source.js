import React, { PropTypes } from 'react';

console.log('inside source!!'); // eslint-disable-line

export default class Source extends React.Component {

  static contextTypes = {
    map: PropTypes.object,
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    sourceOptions: PropTypes.object,
  };

  id = this.props.id;

  source = {
    ...this.props.sourceOptions,
  };

  componentWillMount() {
    const { map } = this.context;
    if (!map.getSource(this.id)) {
      map.addSource(this.id, this.source);
    }
  }

  componentWillReceiveProps(props) {
    // console.log('inside componentWillReceiveProps', props); // eslint-disable-line
    const { map } = this.context;
    const { data } = this.props.sourceOptions;
    if (props.sourceOptions.type === 'geojson') {
      if (props.sourceOptions.data !== data) {
        const source = map.getSource(this.id);
        if (source) {
          source.setData(props.sourceOptions.data);
        }
      }
    }
  }

  componentWillUnmount() {
    const { map } = this.context;
    if (map.getSource(this.id)) {
      map.removeSource(this.id);
    }
  }

  render() {
    return null;
  }

}
