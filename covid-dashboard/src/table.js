/* eslint-disable no-console */
import fetchData from './fetchData.js';

export default class table {
  constructor() {
    [ this.app ] = document.body.getElementsByClassName('app');
    this.fetchData = fetchData;
    this.totalTable = { cases: null, deaths: null, recovered: null };
    this.totalTableHeader = {};
  }

  renderControl() {
    this.radioWrapper = document.createElement('div');
    this.radioWrapper.classList.add('control');
    this.app.appendChild(this.radioWrapper);
    Object.keys(this.totalTable).forEach((bookmark) => {
      const tableControl = document.createElement('a');
      tableControl.classList.add('control__item');
      tableControl.href = `#${bookmark}`;
      tableControl.innerHTML = bookmark;
      this.radioWrapper.appendChild(tableControl);
    });
  }

  renderTable() {
    this.table = document.createElement('div');
    this.table.classList.add('table');
    this.app.appendChild(this.table);

    // всего
    Object.keys(this.totalTable).forEach((bookmark) => {
      this.totalTable[bookmark] = document.createElement('div');
      this.totalTable[bookmark].classList.add(`table__total__${bookmark}`, 'table__total');
      this.totalTable[bookmark].id = bookmark;
      this.table.appendChild(this.totalTable[bookmark]);
      this.totalTableHeader[bookmark] = document.createElement('h3');
      this.totalTableHeader[bookmark].classList.add(`table__total__${bookmark}__header`);
      this.totalTableHeader[bookmark].innerHTML = `Global ${bookmark}: ${this.sumData(bookmark)}`;
      this.totalTable[bookmark].appendChild(this.totalTableHeader[bookmark]);
      this.data.forEach((item) => {
        const country = document.createElement('p');
        country.innerHTML = `${item.country} <br> ${bookmark}: ${item[bookmark]}`;
        this.totalTable[bookmark].appendChild(country);
      });
      console.log(this.totalTable);
    });
    // (() => {
    //   this.todayTable = document.createElement('div');
    //   this.todayTable.classList.add('table__today');
    //   this.table.appendChild(this.totalTable);
    //   this.data.forEach((item) => {
    //     const country = document.createElement('p');
    //     country.innerHTML = `${item.country} <br> cases: ${item.todayCases} deaths: ${item.todayDeaths} recovered: ${item.todayRecovered}`;
    //     this.todayTable.appendChild(country);
    //   });
    // })();
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
    this.renderControl();
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
