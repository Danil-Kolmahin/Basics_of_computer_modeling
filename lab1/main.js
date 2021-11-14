import './theme.js';

document.addEventListener('DOMContentLoaded', () => {
  Highcharts.chart({
    chart: {
      renderTo: 'container',
      type: 'bar',
      backgroundColor: {
        linearGradient: [0, 0, 500, 500],
        stops: [
          [0, 'rgb(255, 255, 255)'],
          [1, 'rgb(240, 240, 255)'],
        ],
      },
      borderWidth: 2,
      plotBackgroundColor: 'rgba(255, 255, 255, .9)',
      plotShadow: true,
      plotBorderWidth: 1,
    },
    title: {
      text: 'Fruit Consumption',
    },
    yAxis: {
      title: {
        text: 'Fruit eaten',
      },
    },
    // xAxis: {
    //   categories: ['Apples', 'Bananas', 'Oranges'],
    // },
    // series: [{
    //   name: 'Jane',
    //   data: [1, 0, 4],
    // }, {
    //   name: 'John',
    //   data: [5, 7, 3],
    // }],
    xAxis: {
      type: 'datetime',
    },
    series: [{
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      pointStart: Date.UTC(2010, 0, 1),
      pointInterval: 3600 * 1000, // one hour
    }],
    credits: {
      enabled: false
    },
  });
});