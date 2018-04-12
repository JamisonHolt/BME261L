import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';

export default class RawChart extends React.Component {
  constructor(props) {
    super(props);
    // TODO: update dataSize to be much larger
    const dataSize = 50;
    let initialData = [];
    let currDate = new Date();
    currDate.setHours(currDate.getHours(), currDate.getMinutes() - dataSize);
    for (let i=0; i<dataSize; i++) {
      currDate.setHours(
        currDate.getHours(),
        currDate.getMinutes() + 1,
        0,
        0
      );
      console.log(currDate.toLocaleTimeString().substring(0, 5));
      initialData.push({
        x: currDate,
        y: 80 + i / 3
      });
    }
    this.state = {
      temp: initialData,
      isCelsius: false
    };
  }

  componentWillReceiveProps(nextProps) {
    //TODO: Update all temperatures when celsius/fahrenheit changed
    if (this.props.temp !== nextProps.temp) {
      let nextTemp = this.state.temp.slice(1);
      nextTemp.push(nextProps.temp);
      this.setState({temp: nextTemp});
    }
  }

  render() {
    return (
      <View style={ this.props.style }>
        <VictoryChart style={{ flex: 1}} scale={{ x: "time" }} >
          <VictoryLine
            data={this.state.temp}
            scale={{ x: "time" }}
            style={{
              flex: 1,
              data: { stroke: "#BF5700" },
            }}
          />
          <VictoryAxis
            label="Time"
            tickFormat={x => x}
            tickCount={1}
            style={{
              flex: 1,
              axis: { stroke: '#FFF' },
              axisLabel: { fontSize: 17, padding: 25, stroke: '#BF5700', fill: '#BF5700' },
              ticks: { stroke: '#FFF', size: 5 },
              tickLabels: { fontSize: 12, padding: 3.5, stroke: '#BF5700' }
            }}

          />
          <VictoryAxis dependentAxis
            label="Temperature"
            tickFormat={y => y}
            tickCount={10}
            domain={[80, 110]}
            style={{
              flex: 20,
              axis: { stroke: '#FFF'},
              axisLabel: { fontSize: 17, padding: 35, stroke: '#BF5700', fill: '#BF5700' },
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