import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';


/**
 * Our chart component to be combined with the entire tempdisplay component
 */
export default class RawChart extends React.Component {
  
  /**
   * Initializes our RawChart by binding methods (to allow)
   * 
   * @param {Map} props - properties passed from App.js to tempdisplay.js to chart.js
   */
  constructor(props) {
    super(props);
    this.state = {
      fahrenheit: null,
      celsius: null,
      isCelsius: this.props.isCelsius,
      clearState: this.props.clearState
    };

    // Set default domain range and data, clear graph
    this.clear();

    // Use domain constants to make sure our graph axes scale well for diff units
    this.FAHR_DOMAIN = [80, 110];
    this.CELS_DOMAIN = [26, 44];
  }

  /**
   * Allows our main app to pass down new properties, in order to sync app state. This is called every
   *   time that we update the parent's state, leading to synchronization of state between components
   * 
   * @param {Map} nextProps - Map of Chart properties to be updated. Called when parent changes state
   */
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
      this.clear();
    }
  }

  /**
   * Clears all data in this component
   */
  clear() {
    // Use two arrays in order to save time converting between units
    this.fahrData = [];
    this.celsData = [];
  }

  /**
   * Returns the data in correct unit type
   */
  getData() {
    // If not enough data for a line, return null. Else return in correct unit type
    if (this.fahrData.length <= 1) {
      return null;
    }
    return this.state.isCelsius ? this.celsData : this.fahrData;
  }

  /**
   * Uses the victorychart library to create our actual chart
   */
  render() {
    // Decides to display a line ONLY when we have at least 2 points to interpolate
    let victoryLine = null;
    if (this.fahrData.length >= 2) {
      victoryLine = (
        <VictoryLine
          data={this.state.isCelsius ? this.celsData : this.fahrData }
          scale = {{ x: "time" }}
          style = {styles.line}
        />
      );
    }

    // Returns the entire, formatted chart
    return (
      <View style={ this.props.style }>
        <VictoryChart style={{ flex: 1 }} scale={{ x: "time" }} >
          {/* Create the line only when we have at least 2 points */}
          {victoryLine}
          {/* Create our independent axis */}
          <VictoryAxis
            label="Time"
            tickFormat={x => x.toString().substring(16, 21)}
            tickCount={3}
            style={styles.xAxis}
          />
          {/* Create our dependent axis */}
          <VictoryAxis dependentAxis
            label="Temperature"
            tickFormat={y => y}
            tickCount={10}
            domain={ this.state.isCelsius ? this.CELS_DOMAIN : this.FAHR_DOMAIN }
            style={styles.yAxis}
          />
        </VictoryChart>
      </View>
    )
  }
}

// CSS styles for our app to make it look pertty
const styles = {
  line: {
    flex: 1,
    data: {
      stroke: "#BF5700"
    },
  },
  xAxis: {
    flex: 1,
    axis: {
      stroke: 'white'
    },
    axisLabel: {
      fontSize: 17,
      padding: 30,
      stroke: '#BF5700',
      fill: '#BF5700' 
    },
    ticks: {
      stroke: 'white',
      size: 5
    },
    tickLabels: {
      fontSize: 12,
      padding: 3.5,
      stroke: '#BF5700'
    }
  },
  yAxis: {
    flex: 20,
    axis: {
      stroke: 'white'
    },
    axisLabel: {
      fontSize: 17,
      padding: 35,
      stroke: '#BF5700',
      fill: '#BF5700'
    },
    ticks: {
      stroke: 'white',
      size: 5
    },
    tickLabels: {
      fontSize: 12,
      padding: 3.5,
      stroke: '#BF5700'
    }
  }
};