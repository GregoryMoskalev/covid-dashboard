import "./scss/main.scss";
import Table from "./table.js";

import {
  renderUI,
  defineList,
  renderListCountries,
  handleFullScreen,
} from "./renderUI.js";
import liveSearch from "./search.js";
import { Keyboard } from "./keyboard.js";
import { getCountry, renderCountryInTable } from "./getCountry.js";

function init() {
  const tb = new Table();
  tb.init();
  renderCountryInTable(tb);
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


