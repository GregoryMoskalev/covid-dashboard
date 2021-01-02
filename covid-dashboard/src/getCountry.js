export function countryChoiсe(country) {
  const event = new CustomEvent('choiseCountry', {
    detail: {
      country,
    },
    bubbles: true,
    cancelable: false,
  });

  document.dispatchEvent(event);
}
function getCountryName(event) {
  const wr = event.target.closest('.country');
  const countryTitle = wr.querySelector('.country__title');
  const country = countryTitle.innerHTML;
  countryChoiсe(country);
  return country;
}
export function getCountry() {
  const countryList = document.querySelector('.list__contries');
  countryList.addEventListener('click', (event) => getCountryName(event));
}
export function renderCountryInTable(table) {
  document.addEventListener('choiseCountry', (e) => {
    table.setRegionData(e.detail.country);
  });
}
export function mapInTable(table) {
  document.addEventListener('choiseCountryInMap', (e) => {
    table.setRegionData(e.detail.countryOnClick);
  });
}
