import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';

export default class RawChart extends React.Component {
  constructor(props) {
    super(props);
    // TODO: update dataSize to be much larger
    const dataSize = 400;
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
      initialData.push({
        x: new Date(currDate),
        y: 90 + i % 10
      });
    }
    this.state = {
      temp: initialData,
      isCelsius: this.props.isCelsius
    };
  }

  componentWillReceiveProps(nextProps) {
    //TODO: Update all temperatures when celsius/fahrenheit changed
    if (this.props.temp !== nextProps.temp) {
      let nextTemp = this.state.temp.slice(1);
      nextTemp.push(nextProps.temp);
      this.setState({temp: nextTemp});
    }
    if (this.props.isCelsius !== nextProps.isCelsius) {
      this.setState({isCelsius: nextProps.isCelsius});
    }
  }

  render() {
    const transform = num => {
      if (this.state.isCelsius) {
        return (num - 32) * 5 / 9;
      }
      return num;
    }
    return (
      <View style={ this.props.style }>
        <VictoryChart style={{ flex: 1}} scale={{ x: "time" }} >
          <VictoryLine
            data={(() => {
              // Convert fahrenheit to celsius if necessary
              if (! this.state.isCelsius) {return this.state.temp;}
              let data = this.state.temp.slice();
              for (let i = 0; i < this.state.temp.length; i++) {
                data[i]["y"] = transform(data[i]["y"]);
              }
              return data
            })()}
            scale={{ x: "time" }}
            style={{
              flex: 1,
              data: { stroke: "#BF5700" },
            }}
          />
          <VictoryAxis
            label="Time"
            tickFormat={x => x.toString().substring(16, 24)}
            tickCount={3}
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
            domain={[transform(80), transform(110)]}
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