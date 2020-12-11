import {dataListCovid, objSort} from "./covidList.js";

export function renderUI() {

  const list = document.querySelector('.list');
  const search = document.createElement('input');
  const select = document.createElement('select');
  const listContries = document.createElement('div');

  list.insertAdjacentElement('afterbegin', search);
  search.insertAdjacentElement('afterend', select);
  select.insertAdjacentElement('afterend', listContries);

  search.classList.add('list__search');
  select.classList.add('list__select');
  listContries.classList.add('list__contries');

}

export async function renderListCountries(data) {
  let value = data;
  value = typeof data !== 'undefined' ? data : 'totalConfirmed';
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
      <div class="country__data">${x[value]} cases</div>
   </div>`
    );
  });
  return arr;
}

function getValueList() {
  const data = this.value;
  renderListCountries(data);
  return data;
 }

 export function defineList() {
  const DATA_COVID = [
    "total Confirmed",
    "total Death",
    "total Recovered",
    "new Confirmed",
    "new Death",
    "new Recoverd",
  ];
  const list = document.querySelector('.list__select');
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