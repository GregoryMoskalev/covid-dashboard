import './scss/main.scss';
import Table from './table.js';
import mapModule from './mapModule.js';
import { renderUI, defineList, renderListCountries, handleFullScreen } from './renderUI.js';
import liveSearch from './search.js';
import { Keyboard } from './keyboard.js';
import { getCountry, renderCountryInTable, mapInTable } from './getCountry.js';
import recommendation from './recommendation.js'

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
recommendation();
