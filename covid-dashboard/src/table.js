/* eslint-disable no-console */
import fetchData from './fetchData.js';

export default class table {
  constructor() {
    this.fetchData = fetchData;
  }

  async init() {
    this.data = await this.fetchData();

    const mod = this.data.population / 100000;
    console.table(this.data);
    // общее количество случаев заболевания
    console.log('cases', this.data.cases);
    // общее количество летальных исходов
    console.log('deaths', this.data.deaths);
    // общее количество выздоровевших
    console.log('recovered', this.data.recovered);

    // количество случаев заболевания за последний день
    console.log('todayCases', this.data.todayCases);
    // количество летальных исходов за последний день
    console.log('todayDeaths', this.data.todayDeaths);
    // количество выздоровевших за последний день
    console.log('todayRecovered', this.data.todayRecovered);

    // общее количество случаев заболевания из расчёта на 100 тыс. населения
    console.log('cases per 100000', (this.data.cases / mod).toFixed(2));
    // общее количество летальных исходов из расчёта на 100 тыс. населения
    console.log('deaths per 100000', (this.data.deaths / mod).toFixed(2));
    // общее количество выздоровевших из расчёта на 100 тыс. населения
    console.log('recovered per 100000', (this.data.recovered / mod).toFixed(2));

    // количество случаев заболевания за последний день из расчёта на 100 тыс. населения
    console.log('todayCases per 100000', (this.data.todayCases / mod).toFixed(2));
    // количество летальных исходов за последний день из расчёта на 100 тыс. населения
    console.log('todayDeaths per 100000', (this.data.todayDeaths / mod).toFixed(2));
    // количество выздоровевших за последний день из расчёта на 100 тыс. населения
    console.log('todayRecovered per 100000', (this.data.todayRecovered / mod).toFixed(2));
  }
}
