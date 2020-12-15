/* eslint-disable no-console */
import fetchData from './fetchData.js';

export default class Table {
  constructor() {
    [ this.tableParent ] = document.body.getElementsByClassName('table-wrapper');
    this.cellsData = [];
    this.fetchData = fetchData;
    this.selectorTime = 0;
    this.selectorCalc = 0;

    this.onChangeCalc = (evt) => {
      this.selectorCalc = evt.target.value;
      this.renderTableCellsData();
    };

    this.onChangeTime = (evt) => {
      this.selectorTime = evt.target.value;
      this.renderTableCellsData();
    };
  }

  renderTable() {
    this.tableCell = [];

    this.table = document.createElement('div');
    this.table.classList.add('table');
    this.tableParent.appendChild(this.table);

    this.renderTableHeading();

    this.table.appendChild(this.renderControl([ 'Total', 'Per 100000 people' ], this.onChangeCalc));
    this.table.appendChild(this.renderControl([ 'All Time', 'Last day' ], this.onChangeTime));

    this.tableRow = document.createElement('div');
    this.tableRow.classList.add('table__row');
    this.table.appendChild(this.tableRow);

    this.renderTableCells();
    this.fillTableCells();
    this.renderTableCellsData();
  }

  renderTableHeading() {
    this.tableHeading = document.createElement('h3');
    this.tableHeading.classList.add('table__heading');
    this.tableHeading.innerHTML = !this.country ? 'global' : this.country;
    this.table.appendChild(this.tableHeading);
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

  renderTableCells() {
    this.cells[this.selectorTime].forEach((_, index) => {
      this.tableCell[index] = document.createElement('div');
      this.tableCell[index].classList.add('table__cell');
      this.tableRow.appendChild(this.tableCell[index]);
    });
  }

  fillTableCells() {
    this.cells[this.selectorTime].forEach((_, index) => {
      this.cellsData[index] = document.createElement('span');
      this.cellsData[index].classList.add('table__data');
      this.tableCell[index].innerHTML = `
      <h3 class="cell-heading">${this.cellsHeaders[index]}</h3>`;
      this.tableCell[index].appendChild(this.cellsData[index]);
    });
  }

  renderTableCellsData() {
    this.cells[this.selectorTime].forEach((cell, index) => {
      this.cellsData[index].innerHTML =
        Number(this.selectorCalc) === 0 ? cell : (cell / this.mod).toFixed(2);
    });
  }

  sumData(param) {
    return Object.values(this.data).reduce((sum, country) => sum + country[param], 0);
  }

  async init(region) {
    this.data = await this.fetchData();
    this.setRegion(region);

    this.cells = [
      [ this.totalCases, this.totalDeaths, this.totalRecovered ],
      [ this.todayCases, this.todayDeaths, this.todayRecovered ],
    ];
    this.cellsHeaders = [ 'Cases', 'Deaths', 'Recovered' ];
    this.renderTable();
  }

  setRegion(region) {
    this.country = region;
    if (!region) {
      this.totalCases = this.sumData('cases');
      this.totalDeaths = this.sumData('deaths');
      this.totalRecovered = this.sumData('recovered');
      this.todayCases = this.sumData('todayCases');
      this.todayDeaths = this.sumData('todayDeaths');
      this.todayRecovered = this.sumData('todayRecovered');
      this.mod = this.sumData('population') / 100000;
    } else {
      const data = this.data.find(({ country }) => country === region);
      this.totalCases = data.cases;
      this.totalDeaths = data.deaths;
      this.totalRecovered = data.recovered;
      this.todayCases = data.todayCases;
      this.todayDeaths = data.todayDeaths;
      this.todayRecovered = data.todayRecovered;
      this.mod = data.population / 100000;
    }
  }
}
