/* eslint-disable no-console */
import fetchData from './fetchData.js';

export default class Table {
  constructor() {
    [ this.tableParent ] = document.body.getElementsByClassName('table-wrapper');
    this.cellsData = [];
    this.fetchData = fetchData;
    this.selectorTime = 0;
    this.selectorCalc = 0;
    this.rate = 100000;
    this.cellsHeaders = [ 'Cases', 'Deaths', 'Recovered' ];

    this.newHtmlElement = (tag, className, iHtml = null) => {
      const element = document.createElement(tag);
      element.classList.add(className);
      if (iHtml) {
        element.innerHTML = iHtml;
      }
      return element;
    };

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

    this.table = this.newHtmlElement('div', 'table');
    this.tableParent.appendChild(this.table);

    this.renderTableHeading();

    this.table.appendChild(this.renderControl([ 'Total', 'Per 100000 people' ], this.onChangeCalc));
    this.table.appendChild(this.renderControl([ 'All Time', 'Last day' ], this.onChangeTime));

    this.tableRow = this.newHtmlElement('div', 'table__row');
    this.table.appendChild(this.tableRow);

    this.renderTableCells();
    this.fillTableCells();
    this.renderTableCellsData();
  }

  renderTableHeading() {
    if (!this.tableHeading) {
      this.tableHeading = this.newHtmlElement('h3', 'table__heading');
      this.table.appendChild(this.tableHeading);
    }
    this.tableHeading.innerHTML = !this.country ? 'global' : this.country;
  }

  renderControl(options, callback) {
    if (!this.select) {
      this.select = [];
    }
    this.select.push(this.newHtmlElement('select', 'selector'));

    options.forEach((option, index) => {
      const op = this.newHtmlElement('option', 'option', option);
      op.value = index;
      this.select[this.select.length - 1].appendChild(op);
    });

    this.select[this.select.length - 1].addEventListener('change', (evt) => callback(evt));
    return this.select[this.select.length - 1];
  }

  renderTableCells() {
    this.cells[this.selectorTime].forEach((_, index) => {
      this.tableCell[index] = this.newHtmlElement('div', 'table__cell');
      this.tableRow.appendChild(this.tableCell[index]);
    });
  }

  fillTableCells() {
    this.cells[this.selectorTime].forEach((_, index) => {
      const iHtml = `
      <h3 class="cell-heading">${this.cellsHeaders[index]}</h3>`;
      this.cellsData[index] = this.newHtmlElement('span', 'table__data', iHtml);
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

  async init() {
    this.data = await this.fetchData();
    this.setRegionData();
    this.renderTable();
  }

  setRegionData(region = null) {
    this.country = region;
    if (!region) {
      this.totalCases = this.sumData('cases');
      this.totalDeaths = this.sumData('deaths');
      this.totalRecovered = this.sumData('recovered');
      this.todayCases = this.sumData('todayCases');
      this.todayDeaths = this.sumData('todayDeaths');
      this.todayRecovered = this.sumData('todayRecovered');
      this.mod = this.sumData('population') / this.rate;
    } else {
      const data = this.data.find(({ country }) => country === region);
      this.totalCases = data.cases;
      this.totalDeaths = data.deaths;
      this.totalRecovered = data.recovered;
      this.todayCases = data.todayCases;
      this.todayDeaths = data.todayDeaths;
      this.todayRecovered = data.todayRecovered;
      this.mod = data.population / this.rate;
    }

    this.cells = [
      [ this.totalCases, this.totalDeaths, this.totalRecovered ],
      [ this.todayCases, this.todayDeaths, this.todayRecovered ],
    ];

    if (this.table) {
      this.renderTableHeading();
      this.renderTableCellsData();
    }
  }
}
