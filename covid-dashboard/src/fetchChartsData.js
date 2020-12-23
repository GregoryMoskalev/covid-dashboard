import axios from 'axios';
import '@babel/polyfill';

export default async function fetchChartsData(country = null) {
  let request = 'https://disease.sh/v3/covid-19/historical/all?lastdays=all';
  if (country) {
    request = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`;
  }
  const response = await axios.get(request);
  return !country ? response.data : response.data.timeline;
}
