import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';

export default class RawChart extends React.Component {
  constructor(props) {
    super(props);
    const dataSize = 50;
    let initialData = [];
    for (let i=0; i<dataSize; i++) {
      initialData.push({
        x: i,
        y: this.props.min + i
      });
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
    return (
      <View style={ this.props.style }>
        <VictoryChart style={{ flex: 1}}>
          <VictoryLine
            style={{
              flex: 1,
              data: { stroke: "#BF5700" },
            }}
            data={this.state.temp}
          />
          <VictoryAxis
            tickFormat={x => x}
            label="Time"
            style={{
              flex: 1,
              axis: { stroke: '#FFF' },
              axisLabel: { fontSize: 20, padding: 20, stroke: '#BF5700', fill: '#BF5700' },
              ticks: { stroke: '#FFF', size: 5 },
              tickLabels: { fontSize: 12, padding: 3.5, stroke: '#BF5700' }
            }}

          />
          <VictoryAxis dependentAxis
            label="Temperature"
            tickFormat={y => y}
            style={{
              flex: 20,
              axis: { stroke: '#FFF'},
              axisLabel: { fontSize: 20, padding: 40, stroke: '#BF5700', fill: '#BF5700' },
              ticks: { stroke: '#FFF', size: 5},
              tickLabels: { fontSize: 12, padding: 3.5, stroke: '#BF5700'}
            }}
          />
        </VictoryChart>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  victoryChart: {

  },
  victoryYAxis: {

  },
  victoryXAxis: {
    
  },
  victoryLine: {

  }
});