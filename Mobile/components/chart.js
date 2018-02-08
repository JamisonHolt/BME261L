import React from 'react';
import { StyleSheet, Text, View, Component } from 'react-native';
import ChartView from 'react-native-highcharts';

export default class RawChart extends React.Component {
  render() {
    const Highcharts='Highcharts';
    const conf={
      chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          load: function () {

            // set up the updating of the chart each second
            let series = this.series[0];
            setInterval(() => {
              let x = (new Date()).getTime(); // current time
              let y = Math.random();
              series.addPoint([x, y], true, true);
            }, 2000);
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
        data: (function () {
          // generate an array of random data
          let data = [],
          time = (new Date()).getTime(),
          i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()
            });
          }
          return data;
        }())
      }],
      credits: {
        enabled: false
      }
    };

    const options = {
      global: {
        useUTC: false
      },
      lang: {
        decimalPoint: ',',
        thousandsSep: '.'
      }
    };

    return (
      <ChartView style={{height:300, width:350}} config={conf} options={options}></ChartView>
    );
  }
}
