/* eslint-disable no-console */
import fetchData from './fetchData.js';

export default class table {
  constructor() {
    this.fetchData = fetchData;
    this.totalCases = null;
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
    const mod = this.sumData('population') / 100000;
    console.table(this.data);
    // общее количество случаев заболевания
    console.log('cases', this.totalCases);
    // общее количество летальных исходов
    console.log('deaths', this.totalDeaths);
    // // общее количество выздоровевших
    console.log('recovered', this.totalRecovered);

    // // количество случаев заболевания за последний день
    console.log('todayCases', this.todayCases);
    // // количество летальных исходов за последний день
    console.log('todayDeaths', this.todayDeaths);
    // // количество выздоровевших за последний день
    console.log('todayRecovered', this.todayRecovered);

    // // общее количество случаев заболевания из расчёта на 100 тыс. населения
    console.log('cases per 100000', (this.totalCases / mod).toFixed(2));
    // // общее количество летальных исходов из расчёта на 100 тыс. населения
    console.log('deaths per 100000', (this.totalDeaths / mod).toFixed(2));
    // // общее количество выздоровевших из расчёта на 100 тыс. населения
    console.log('recovered per 100000', (this.totalRecovered / mod).toFixed(2));

    // // количество случаев заболевания за последний день из расчёта на 100 тыс. населения
    console.log('todayCases per 100000', (this.todayCases / mod).toFixed(2));
    // // количество летальных исходов за последний день из расчёта на 100 тыс. населения
    console.log('todayDeaths per 100000', (this.todayDeaths / mod).toFixed(2));
    // // количество выздоровевших за последний день из расчёта на 100 тыс. населения
    console.log('todayRecovered per 100000', (this.todayRecovered / mod).toFixed(2));
  }
}
