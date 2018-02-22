import React from 'react';
import { StyleSheet, Text, View, Component } from 'react-native';
import ChartView from 'react-native-highcharts';
// import BlueTooth from './bluetooth';
import readTemp from './test';

export default class RawChart extends React.Component {
  render() {
    const Highcharts='Highcharts';
    let bt = new BlueTooth();
    let conf={
      chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          load: function () {
            // set up the updating of the chart each second
            let x = 0;
            let series = this.series[0];
            setInterval(function () {
              x++; // current time
              let y = bt.getRecentTemp();
              series.addPoint([x, y], true, true);
            }, 750);
          }
        }
      },
      title: {
        text: 'Live random data'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        min: -0.25,
        max: 1.25,
        startOnTick: false,
        endOnTick: false,
        title: {
          text: 'Value'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
          Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
          Highcharts.numberFormat(this.y, 2);
        }
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Random data',
        animation: true,
        data: (function () {
          // generate an array of random data
          let data = [];
          const graphSize = 40;
          for (let i = 1-graphSize; i <= 0; i += 1) {
            data.push({x: i, y: 0});
          }
          return data;
        }())
      }]
    };

    const options = {
      // global: {
      //   useUTC: false
      // },
      // lang: {
      //   decimalPoint: ',',
      //   thousandsSep: '.'
      // }
    };

    return (
      <ChartView style={{height:300, width:300}} config={conf} />
    );
  }
}
