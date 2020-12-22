import './scss/main.scss';
import Table from './Table.js';
import mapModule from './mapModule.js';
import { renderUI, defineList, renderListCountries, handleFullScreen } from './renderUI.js';
import liveSearch from './search.js';
import { Keyboard } from './keyboard.js';
import { getCountry, renderCountryInTable, mapInTable } from './getCountry.js';

function init() {
  const tb = new Table();
  tb.init();
  renderCountryInTable(tb);
  mapInTable(tb);
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
mapModule();
