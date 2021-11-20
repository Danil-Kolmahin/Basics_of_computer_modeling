// import './theme.js';

// https://www.highcharts.com/docs/chart-and-series-types/histogram-series

import { fx, xiArr } from './calculations.js';

// const data = new Array(10000).fill(0).map(Math.random);

const displayHistogram = ({ title, data, renderTo }) =>
  Highcharts.chart({
    chart: {
      renderTo,
    },

    title: {
      text: title,
    },

    xAxis: [
      {
        title: { text: 'Data' },
        alignTicks: false,
      },
      {
        title: { text: 'Histogram' },
        alignTicks: false,
        opposite: true,
      },
    ],

    yAxis: [
      {
        title: { text: 'Data' },
      },
      {
        title: { text: 'Histogram' },
        opposite: true,
      },
    ],

    series: [
      {
        name: 'Histogram',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: -1,
      },
      {
        name: 'Data',
        type: 'scatter',
        data,
        id: 's1',
        marker: {
          radius: 1.5,
        },
        turboThreshold: 10000,
      },
    ],

    plotOptions: {
      histogram: {
        binsNumber: 20,
      },
    },

    credits: {
      enabled: false,
    },
  });

displayHistogram({ title: 'Lab1', data: xiArr, renderTo: 'container' });

displayHistogram({ title: 'fx', data: fx, renderTo: 'container2' });
