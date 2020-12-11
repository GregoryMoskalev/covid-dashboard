import axios from 'axios';
import '@babel/polyfill';

export default async function fetchData(country = null) {
  let request = 'https://corona.lmao.ninja/v3/covid-19/countries';
  if (country) {
    request = `https://corona.lmao.ninja/v3/covid-19/countries/${country}`;
  }
  const response = await axios.get(request);
  return response.data;
}
