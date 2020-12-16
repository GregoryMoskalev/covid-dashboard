export function getCount(event) {
  const wr = event.target.closest('.country')
  const countryTitle = wr.querySelector('.country__title');
  const res = countryTitle.innerHTML;
  return res;
 }
 
 
 export function getCountry() {
   const countryList = document.querySelector('.list__contries');
   countryList.addEventListener('click', (event) => getCount(event));
  }