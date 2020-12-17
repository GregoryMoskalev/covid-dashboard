import axios from 'axios';
import Chart from 'chart.js';
import Table from './Table.js';

export default class Charts extends Table {
  constructor() {
    super();
    [ this.chartParent ] = document.body.getElementsByClassName('chart-wrapper');
  }

  async renderMyChart() {
    const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');

    this.chart = this.newHtmlElement('div', 'chart');
    this.chartParent.appendChild(this.chart);
    this.ctx = this.newHtmlElement('canvas');
    this.ctx.id = 'myChart';
    this.chart.appendChild(this.ctx);

    this.cumulativeCases = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: Object.keys(response.data.cases),
        datasets: [
          {
            label: 'Cumulative Cases',
            data: Object.values(response.data.cases),
            backgroundColor: '#212121',
            fill: 'Disabled',
          },
          {
            label: 'Cumulative Deaths',
            data: Object.values(response.data.deaths),
            backgroundColor: '#d50000',
            fill: 'Disabled',
          },
          {
            label: 'Cumulative Recovered',
            data: Object.values(response.data.recovered),
            backgroundColor: '#4caf50',
            fill: 'Disabled',
          },
        ],
      },
    });
  }
}
