import "./scss/main.scss";
import Table from "./table.js";
import mapModule from './mapModule.js';
import {
  renderUI,
  defineList,
  renderListCountries,
  handleFullScreen,
} from "./renderUI.js";
import liveSearch from "./search.js";
import { Keyboard } from "./keyboard.js";
import getCountry from "./getCountry.js";

function init() {
  renderUI();
  defineList();
  renderListCountries();
  liveSearch();
  handleFullScreen();
  getCountry();
  window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
  });
}

init();

mapModule();

const tb = new Table();
tb.init();
