import './scss/main.scss';
import Table from './Table.js';
import Charts from './Charts.js';

import { renderUI, defineList, renderListCountries, handleFullScreen } from './renderUI.js';
import liveSearch from './search.js';
import { Keyboard } from './keyboard.js';
import getCountry from './getCountry.js';

function init() {
  renderUI();
  defineList();
  renderListCountries();
  liveSearch();
  handleFullScreen();
  getCountry();
  window.addEventListener('DOMContentLoaded', () => {
    Keyboard.init();
  });
}

init();

const tb = new Table();
const ch = new Charts();
tb.init();
ch.renderMyCharts(0, 0, null);
