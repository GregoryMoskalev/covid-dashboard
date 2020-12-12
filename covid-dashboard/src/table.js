/* eslint-disable no-console */
import fetchData from './fetchData.js';

export default class table {
  constructor() {
    [ this.tableParent ] = document.body.getElementsByClassName('table-wrapper');
    this.fetchData = fetchData;
    this.selectorTime = 0;
    this.selectorCalc = 0;

    this.onChangeCalc = (evt) => {
      this.selectorCalc = evt.target.value;
      this.fillTableCells();
    };

    this.onChangeTime = (evt) => {
      this.selectorTime = evt.target.value;
      this.fillTableCells();
    };
  }

  renderControl(options, callback) {
    if (!this.select) {
      this.select = [];
    }
    this.select.push(document.createElement('select'));
    this.select[this.select.length - 1].classList.add('selector');

    options.forEach((option, index) => {
      const op = document.createElement('option');
      op.classList.add('option');
      op.innerHTML = option;
      op.value = index;
      this.select[this.select.length - 1].appendChild(op);
    });

    this.select[this.select.length - 1].addEventListener('change', (evt) => callback(evt));
    return this.select[this.select.length - 1];
  }

  renderTable() {
    this.tableCell = [];

    this.table = document.createElement('div');
    this.table.classList.add('table');
    this.tableParent.appendChild(this.table);

    this.table.appendChild(this.renderControl([ 'Total', 'Per 100000 people' ], this.onChangeCalc));
    this.table.appendChild(this.renderControl([ 'All Time', 'Last day' ], this.onChangeTime));

    this.renderTableCells();
    this.fillTableCells();
  }

  renderTableCells() {
    this.cells[this.selectorTime].forEach((cell, index) => {
      this.tableCell[index] = document.createElement('div');
      this.tableCell[index].classList.add('table__cell');
      this.table.appendChild(this.tableCell[index]);
    });
  }

  fillTableCells() {
    this.cells[this.selectorTime].forEach((cell, index) => {
      this.tableCell[index].innerHTML =
        Number(this.selectorCalc) === 0 ? cell : (cell / this.mod).toFixed(2);
    });
  }

  sumData(param) {
    return Object.values(this.data).reduce((sum, country) => sum + country[param], 0);
  }

  async init(country) {
    this.data = await this.fetchData(country);
    if (!country) {
      this.totalCases = this.sumData('cases');
      this.totalDeaths = this.sumData('deaths');
      this.totalRecovered = this.sumData('recovered');
      this.todayCases = this.sumData('todayCases');
      this.todayDeaths = this.sumData('todayDeaths');
      this.todayRecovered = this.sumData('todayRecovered');
    }

    this.mod = this.sumData('population') / 100000;
    this.cells = [
      [ this.totalCases, this.totalDeaths, this.totalRecovered ],
      [ this.todayCases, this.todayDeaths, this.todayRecovered ],
    ];
    // this.renderControl();
    this.renderTable(this.totalCases, this.totalDeaths, this.totalRecovered);
    // общее количество случаев заболевания
    // console.log('cases', this.totalCases);
    // // общее количество летальных исходов
    // console.log('deaths', this.totalDeaths);
    // // // общее количество выздоровевших
    // console.log('recovered', this.totalRecovered);

    // // // количество случаев заболевания за последний день
    // console.log('todayCases', this.todayCases);
    // // // количество летальных исходов за последний день
    // console.log('todayDeaths', this.todayDeaths);
    // // // количество выздоровевших за последний день
    // console.log('todayRecovered', this.todayRecovered);

    // // // общее количество случаев заболевания из расчёта на 100 тыс. населения
    // console.log('cases per 100000', (this.totalCases / this.mod).toFixed(2));
    // // // общее количество летальных исходов из расчёта на 100 тыс. населения
    // console.log('deaths per 100000', (this.totalDeaths / this.mod).toFixed(2));
    // // // общее количество выздоровевших из расчёта на 100 тыс. населения
    // console.log('recovered per 100000', (this.totalRecovered / this.mod).toFixed(2));

    // // // количество случаев заболевания за последний день из расчёта на 100 тыс. населения
    // console.log('todayCases per 100000', (this.todayCases / this.mod).toFixed(2));
    // // // количество летальных исходов за последний день из расчёта на 100 тыс. населения
    // console.log('todayDeaths per 100000', (this.todayDeaths / this.mod).toFixed(2));
    // // // количество выздоровевших за последний день из расчёта на 100 тыс. населения
    // console.log('todayRecovered per 100000', (this.todayRecovered / this.mod).toFixed(2));
  }
}
