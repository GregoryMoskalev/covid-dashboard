import Chart from 'chart.js';
import fetchChartsData from './fetchChartsData.js';
import {
  convertNumberToSI,
  convertDateUSToEU,
  dailyFromCumulative,
  newHtmlElement,
} from './utilities.js';

export default class Charts {
  constructor() {
    this.fetchChartsData = fetchChartsData;
    this.rate = 100000;
  }

  async renderMyCharts(time, rate, mod, country) {
    this.country = country;
    this.ctx = [];
    [ this.chartParent ] = document.body.getElementsByClassName('chart-wrapper');

    while (this.chartParent.lastElementChild) {
      this.chartParent.removeChild(this.chartParent.lastElementChild);
    }

    this.response = await this.fetchChartsData(country);

    this.cumulativeChart = newHtmlElement('div', 'chart');
    this.chartParent.appendChild(this.cumulativeChart);
    this.ctx = newHtmlElement('canvas');
    this.cumulativeChart.appendChild(this.ctx);

    const data = {
      cases: Object.values(this.response.cases).map((el) => (!rate ? el : +(el / mod).toFixed(2))),
      deaths: Object.values(this.response.deaths).map((el) => (!rate ? el : (el / mod).toFixed(2))),
      recovered: Object.values(this.response.recovered).map(
        (el) => (!rate ? el : (el / mod).toFixed(2)),
      ),
    };

    this.cumulativeData = [
      [ 'Cumulative Cases', 'Cumulative Deaths', 'Cumulative Recovered' ],
      [ data.cases, data.deaths, data.recovered ],
    ];
    this.dailyData = [
      [ 'Daily Cases', 'Daily Deaths', 'Daily Recovered' ],
      [
        dailyFromCumulative(data.cases),
        dailyFromCumulative(data.deaths),
        dailyFromCumulative(data.recovered),
      ],
    ];
    this.renderChart(
      time === 0 ? this.cumulativeData : this.dailyData,
      Object.keys(this.response.cases),
      rate,
      time,
    );
  }

  renderChart(data, label, rate, time) {
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {
            label: data[0][0],
            data: data[1][0],
            backgroundColor: '#212121',
            borderColor: '#212121',
            fill: 'Disabled',
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 2,
          },
          {
            label: data[0][1],
            data: data[1][1],
            backgroundColor: '#d50000',
            borderColor: '#d50000',
            fill: 'Disabled',
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 2,
          },
          {
            label: data[0][2],
            data: data[1][2],
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
        title: {
          display: true,
          text: `${!this.country ? 'Global' : this.country}, ${!rate ? '' : 'Per 100k, '}${!time
            ? 'All Time'
            : 'Last Day'}`,
        },
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
}
