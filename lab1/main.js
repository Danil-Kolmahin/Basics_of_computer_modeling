// import './theme.js';

// https://www.highcharts.com/docs/chart-and-series-types/histogram-series

const data = new Array(10000).fill(0).map(Math.random);

Highcharts.chart({
  chart: {
    renderTo: 'container',
  },

  title: {
    text: 'Lab1',
  },

  xAxis: [{
    title: { text: 'Data' },
    alignTicks: false,
  }, {
    title: { text: 'Histogram' },
    alignTicks: false,
    opposite: true,
  }],

  yAxis: [{
    title: { text: 'Data' },
  }, {
    title: { text: 'Histogram' },
    opposite: true,
  }],

  series: [{
    name: 'Histogram',
    type: 'histogram',
    xAxis: 1,
    yAxis: 1,
    baseSeries: 's1',
    zIndex: -1,
  }, {
    name: 'Data',
    type: 'scatter',
    data: data,
    id: 's1',
    marker: {
      radius: 1.5,
    },
    turboThreshold: 10000,
  }],

  credits: {
    enabled: false,
  },
});