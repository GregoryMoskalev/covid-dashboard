import { dataListCovid, objSort } from "./covidList.js";

export function renderUI() {
  const list = document.querySelector(".list");
  const wrapSearch = document.createElement("div");
  const search = document.createElement("input");
  const select = document.createElement("select");
  const listContries = document.createElement("div");
  const btnKeyBoard = document.createElement("div");
  const btnFullScreen = document.createElement("div");

  list.insertAdjacentElement("afterbegin", btnFullScreen);
  list.insertAdjacentElement("afterbegin", wrapSearch);
  wrapSearch.insertAdjacentElement("afterbegin", search);
  wrapSearch.insertAdjacentElement("beforeend", btnKeyBoard);
  wrapSearch.insertAdjacentElement("afterend", select);
  select.insertAdjacentElement("afterend", listContries);

  btnFullScreen.classList.add("btn__full");
  wrapSearch.classList.add("wrap__search");
  btnKeyBoard.classList.add("btn__key");
  search.classList.add("list__search");
  search.classList.add("use-keyboard-input");
  select.classList.add("list__select");
  listContries.classList.add("list__contries");
}

function include(title, str) {
  for (let i = 0; i < title.length; i += 1) {
    if (str.includes(title[i])) {
      return title[i];
    }
  }
  return title;
}

export async function renderListCountries(data) {
  let value = data;
  const title = ["Confirmed", "Death", "Recovered"];

  value = typeof data !== "undefined" ? data : "totalConfirmed";

  const name = include(title, value);
  const arr = await dataListCovid();

  arr.sort(objSort(value));
  if (document.querySelectorAll(".country").length) {
    document.querySelectorAll(".country").forEach((x) => x.remove());
  }

  const listContries = document.querySelector(".list__contries");
  arr.forEach((x) => {
    listContries.insertAdjacentHTML(
      "afterbegin",
      `<div class = "country">
     <div class = "country__description">
       <img class ="country__flag" src="${x.flag}"alt="lorem">
       <p class = "country__title">${x.country}</p></div>
      <div class="country__data">${x[value]} ${name}</div>
   </div>`
    );
  });
  return arr;
}

function getValueList() {
  const data = this.value;
  const input = document.querySelector(".list__search");
  renderListCountries(data);
  input.value = "";
  return data;
}

export function defineList() {
  const DATA_COVID = [
    "total Confirmed",
    "total Death",
    "total Recovered",
    "new Confirmed",
    "new Death",
    "new Recovered",
    "total Confirmed per 100000",
    "total Death per 100000",
    "total Recovered per 100000",
    "new Confirmed per 100000",
    "new Death per 100000",
    "new Recovered per 100000",
  ];
  const list = document.querySelector(".list__select");
  DATA_COVID.map((element) => {
    const reg = element.replace(/\s/g, "");
    list.insertAdjacentHTML(
      "afterbegin",
      `<option class = "option" value="${reg}">${element}</option>`
    );
    list.addEventListener("change", getValueList);
    return list;
  });
}

