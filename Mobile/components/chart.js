import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';


export default class RawChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fahrenheit: null,
      celsius: null,
      isCelsius: this.props.isCelsius,
      clearState: this.props.clearState
    };

    // Set default domain range and data
    this.setDefaults();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isCelsius != nextProps.isCelsius) {
      this.setState({ isCelsius: nextProps.isCelsius });
    }
    if (this.state.fahrenheit !== nextProps.fahrenheit) {
      this.setState({ fahrenheit: nextProps.fahrenheit, celsius: nextProps.celsius });
      const currDate = new Date();
      this.fahrData.push({ x: currDate, y: parseFloat(nextProps.fahrenheit) });
      this.celsData.push({ x: currDate, y: parseFloat(nextProps.celsius) });
    }
    if (this.state.clearState != nextProps.clearState) {
      this.setState({ clearState: nextProps.clearState, celsius: null, fahrenheit: null });
      this.setDefaults();
    }
  }

  setDefaults() {
    // Use two arrays in order to save time converting between units
    this.fahrData = [];
    this.celsData = [];

    // Use domain constants to make sure our graph axes scale well for diff units
    this.FAHR_DOMAIN = [80, 110];
    this.CELS_DOMAIN = [26, 44];
  }

  getData() {
    if (this.fahrData.length <= 1) {
      return null;
    }
    return this.state.isCelsius ? this.celsData : this.fahrData;
  }

  render() {
    let victoryLine = null;
    if (this.fahrData.length >= 2) {
      victoryLine = (
        <VictoryLine
          data={this.state.isCelsius ? this.celsData : this.fahrData }
          scale = {{ x: "time" }}
          style = {{
            flex: 1,
            data: { stroke: "#BF5700" },
          }}
        />
      );
    }
    return (
      <View style={ this.props.style }>
        <VictoryChart style={{ flex: 1 }} scale={{ x: "time" }} >
          {victoryLine}
          <VictoryAxis
            label="Time"
            tickFormat={x => x.toString().substring(16, 21)}
            tickCount={3}
            style={{
              flex: 1,
              axis: { stroke: 'white' },
              axisLabel: { fontSize: 17, padding: 30, stroke: '#BF5700', fill: '#BF5700' },
              ticks: { stroke: 'white', size: 5 },
              tickLabels: { fontSize: 12, padding: 3.5, stroke: '#BF5700' }
            }}
          />
          <VictoryAxis dependentAxis
            label="Temperature"
            tickFormat={y => y}
            tickCount={10}
            domain={ this.isCelsius ? this.CELS_DOMAIN : this.FAHR_DOMAIN }
            style={{
              flex: 20,
              axis: { stroke: 'white'},
              axisLabel: { fontSize: 17, padding: 35, stroke: '#BF5700', fill: '#BF5700' },
              ticks: { stroke: 'white', size: 5},
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