import React from 'react';
import { Text, View } from 'react-native';
import { LineChart, YAxis, XAxis } from 'react-native-svg-charts'

export default class RawChart extends React.Component {
  constructor(props) {
    super(props);
    const dataSize = 50;
    let initialData = [];
    for (let i=0; i<dataSize; i++) {
      initialData.push(this.props.min);
    }
    this.state = {
      temp: initialData
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.temp !== nextProps.temp) {
      let nextTemp = this.state.temp.slice(1);
      nextTemp.push(nextProps.temp);
      this.setState({temp: nextTemp});
    }
  }

  render() {
    const conf = {
      stroke: 'rgb(134, 65, 244)'
    }
    return (
      <View style={ this.props.style }>
        <YAxis
          style={ { flex: 0 } }
          data={ this.state.temp }
          svg={{
              fill: 'grey',
              fontSize: 10,
          }}
          formatLabel={ value => `${value} ºF` }
          min={ this.props.min }
          max={ this.props.max }
        />
        <LineChart
          yAccessor={(res) => {return res.item}}
          xAccessor={(res) => {return res.index}}
          style={ { flex: 1 } }
          data={ this.state.temp }
          svg={conf}
          contentInset={ { top: 20, bottom: 20 } }
          animate={false}
          gridMin={ this.props.min }
          gridMax = { this.props.max }
        />
        <XAxis
          style={ { marginHorizontal: -10 } }
          data={ (() => {let data=[]; for (let i=0; i<50; i++) {data.push(i);} return data;})() }
          svg={{
              fill: 'grey',
              fontSize: 10,
          }}
          formatLabel={ value => `${value} ºF` }
        />
      </View>
    )
  }

}
