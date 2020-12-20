import '@babel/polyfill';

export default async function getCovidCounty() {
 let dataCovid;
  try {
   const response = await fetch('https://corona.lmao.ninja/v3/covid-19/countries');
   dataCovid = await response.json();
  } 
  catch (error) {
    return error;
  }
  return dataCovid;
}
