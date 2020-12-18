import "./scss/main.scss";
import {
  renderUI,
  defineList,
  renderListCountries,
} from "./renderUI.js";
import liveSearch from "./search.js";
import { Keyboard } from "./keyboard.js";
import  getCountry from "./getCountry.js";
import fullScreen from "./fullScreen.js"

function init() {
  renderUI();
  defineList();
  renderListCountries();
  liveSearch();
  fullScreen();
  getCountry();
  window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
  });
}

init();
