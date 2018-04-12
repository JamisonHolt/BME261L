import React from 'react';
import { Text, View } from 'react-native';
import { VictoryLine } from 'victory-native';

export default class RawChart extends React.Component {
  constructor(props) {
    super(props);
    const dataSize = 50;
    let initialData = [];
    for (let i=0; i<dataSize; i++) {
      initialData.push({
        x: i,
        y: this.props.min
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
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" }
          }}
          data={this.state.temp}
        />
      </View>
    )
  }

}
