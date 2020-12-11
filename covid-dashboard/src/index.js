import './scss/main.scss';
import {renderUI, defineList, renderListCountries} from "./renderUI.js";
import liveSearch from "./search.js";

function init() {
  renderUI();
  defineList();
  renderListCountries();
  liveSearch();
}

init();