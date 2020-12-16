import Table from './Table.js';

export default class Chart extends Table {
  renderCanvas() {
    this.myChart = this.newHtmlElement('canvas');
    this.myChart.id = 'myChart';
  }
}
