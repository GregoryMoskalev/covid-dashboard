import axios from 'axios';
import Chart from 'chart.js';
import {
  convertNumberToSI,
  convertDateUSToEU,
  dailyFromCumulative,
  newHtmlElement,
} from './utilities.js';

export default class Charts {
  async renderMyChart(time) {
    [ this.chartParent ] = document.body.getElementsByClassName('chart-wrapper');

    while (this.chartParent.lastElementChild) {
      this.chartParent.removeChild(this.chartParent.lastElementChild);
    }

    const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    this.chart = newHtmlElement('div', 'chart');
    this.chartParent.appendChild(this.chart);
    this.ctx = newHtmlElement('canvas');
    this.chart.appendChild(this.ctx);

    let cases = [ 'Cumulative Cases', Object.values(response.data.cases) ];
    let deaths = [ 'Cumulative Deaths', Object.values(response.data.deaths) ];
    let recovered = [ 'Cumulative Recovered', Object.values(response.data.recovered) ];
    if (Number(time) !== 0) {
      cases = [ 'Daily Cases', dailyFromCumulative(Object.values(response.data.cases)) ];
      deaths = [ 'Daily Cases', dailyFromCumulative(Object.values(response.data.deaths)) ];
      recovered = [ 'Daily Cases', dailyFromCumulative(Object.values(response.data.recovered)) ];
    }

    this.cumulativeCases = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: Object.keys(response.data.cases),
        datasets: [
          {
            label: cases[0],
            data: cases[1],
            backgroundColor: '#212121',
            borderColor: '#212121',
            fill: 'Disabled',
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 2,
          },
          {
            label: deaths[0],
            data: deaths[1],
            backgroundColor: '#d50000',
            borderColor: '#d50000',
            fill: 'Disabled',
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 2,
          },
          {
            label: recovered[0],
            data: recovered[1],
            backgroundColor: '#4caf50',
            borderColor: '#4caf50',
            fill: 'Disabled',
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            title: (item) => {
              return convertDateUSToEU([ item[0].xLabel ]);
            },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: (value) => convertNumberToSI(value),
              },
            },
          ],
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'month',
              },
            },
          ],
        },
      },
    });
  }

  // async renderMyChart2() {
  //   const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  //   this.chart = this.newHtmlElement('div', 'chart');
  //   this.chartParent.appendChild(this.chart);
  //   this.ctx = this.newHtmlElement('canvas');
  //   this.ctx.id = 'myChart';
  //   this.chart.appendChild(this.ctx);
  //   console.table(Object.values(response.data.recovered));

  //   this.dailyCases = new Chart(this.ctx, {
  //     type: 'line',
  //     data: {
  //       labels: convertDateUSToEU(Object.keys(response.data.cases)),
  //       datasets: [
  //         {
  //           label: 'Cumulative Cases',
  //           data: dailyFromCumulative(Object.values(response.data.cases)),
  //           backgroundColor: '#212121',
  //           fill: 'Disabled',
  //           borderWidth: 1,
  //         },
  //         {
  //           label: 'Cumulative Deaths',
  //           data: dailyFromCumulative(Object.values(response.data.deaths)),
  //           backgroundColor: '#d50000',
  //           fill: 'Disabled',
  //           borderWidth: 1,
  //         },
  //         {
  //           label: 'Cumulative Recovered',
  //           data: dailyFromCumulative(Object.values(response.data.recovered)),
  //           backgroundColor: '#4caf50',
  //           fill: 'Disabled',
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         yAxes: [
  //           {
  //             ticks: {
  //               callback: (value) => convertNumberToSI(value),
  //             },
  //           },
  //         ],
  //         xAxes: [
  //           {
  //             stacked: true,
  //             ticks: {
  //               maxTicksLimit: 6,
  //               callback: (value) => monthFromNumber(value),
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
  // }
}
