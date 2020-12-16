import './scss/main.scss';
import {renderUI, defineList, renderListCountries, fullScreen} from "./renderUI.js";
import liveSearch from "./search.js";
import {Keyboard} from "./keyboard.js"

function init() {
  renderUI();
  defineList();
  renderListCountries();
  liveSearch();
  fullScreen();
  window.addEventListener('DOMContentLoaded', function() {
    Keyboard.init();
  });
}


init();
