/* eslint-disable no-console */
import fetchData from './fetchData.js';

export default class table {
  constructor() {
    [ this.tableParent ] = document.body.getElementsByClassName('table-wrapper');
    this.fetchData = fetchData;
  }

  // renderControl() {
  //   this.radioWrapper = document.createElement('div');
  //   this.radioWrapper.classList.add('control');
  //   this.tableParent.appendChild(this.radioWrapper);
  //   Object.keys(this.totalTable).forEach((bookmark) => {
  //     const tableControl = document.createElement('a');
  //     tableControl.classList.add('control__item');
  //     tableControl.href = `#${bookmark}`;
  //     tableControl.innerHTML = bookmark;
  //     this.radioWrapper.appendChild(tableControl);
  //   });
  // }

  renderTable() {
    this.table = document.createElement('table');
    this.table.classList.add('table__all-time');
    this.tableParent.appendChild(this.table);

    this.tableRow = [];
    for (let row = 0; row < 3; row += 1) {
      this.tableRow[row] = document.createElement('tr');
      this.tableRow[row].classList.add('table__row');
      this.table.appendChild(this.tableRow[row]);
    }

    this.tableHeader = { '': null, cases: null, deaths: null, recovered: null };
    Object.keys(this.tableHeader).forEach((header) => {
      this.tableHeader[header] = document.createElement('th');
      this.tableHeader[header].classList.add('table__header');
      this.tableHeader[header].innerHTML = header;
      this.tableRow[0].appendChild(this.tableHeader[header]);
    });

    this.totalCasesRow = { total: null, cases: null, deaths: null, recovered: null };
    Object.keys(this.totalCasesRow).forEach((tCell) => {
      this.totalCasesRow[tCell] = document.createElement('td');
      this.totalCasesRow[tCell].classList.add('table__cell');
      this.totalCasesRow[tCell].innerHTML = tCell === 'total' ? 'total' : this.sumData(tCell);
      this.tableRow[1].appendChild(this.totalCasesRow[tCell]);
    });

    this.per100KCasesRow = { '100k': null, cases: null, deaths: null, recovered: null };
    Object.keys(this.per100KCasesRow).forEach((tCell) => {
      this.per100KCasesRow[tCell] = document.createElement('td');
      this.per100KCasesRow[tCell].classList.add('table__cell');
      this.per100KCasesRow[tCell].innerHTML =
        tCell === '100k' ? 'per 100000 people' : (this.totalCases / this.mod).toFixed(2);
      this.tableRow[2].appendChild(this.per100KCasesRow[tCell]);
    });
  }

  sumData(param) {
    return Object.values(this.data).reduce((sum, country) => sum + country[param], 0);
  }

  async init() {
    this.data = await this.fetchData('');
    this.totalCases = this.sumData('cases');
    this.totalDeaths = this.sumData('deaths');
    this.totalRecovered = this.sumData('recovered');

    this.todayCases = this.sumData('todayCases');
    this.todayDeaths = this.sumData('todayDeaths');
    this.todayRecovered = this.sumData('todayRecovered');
    this.mod = this.sumData('population') / 100000;
    // this.renderControl();
    this.renderTable();
    // console.table(this.data);
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
