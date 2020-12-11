import getCovidCounty from "./dataFetch.js";

export const dataListCovid = async function () {
  const item = [];
  item.length = 0;
  const list = await getCovidCounty();
  list.forEach((data, ind) => {
    const populationOnThousand = data.population / 100000;
    item[ind] = {
      country: data.country,
      flag: data.countryInfo.flag,
      totalConfirmed: data.cases, // общ кол-во заболевших
      totalDeath: data.deaths, // общ, количество смертей
      totalRecovered: data.recovered, // общ, количество вылечившихся
      newConfirmed: data.todayCases, // last day кол-во заболевших
      newDeath: data.todayDeaths, // last day количество смертей
      newRecoverd: data.todayRecovered, // last day заболевших
      totalConfirmednOnThousand: Math.ceil(data.cases / populationOnThousand), // общ кол-во заболевших на 100к
      totalDeathnOnThousand: Math.ceil(data.deaths / populationOnThousand), // общ, количество смертей на 100к
      totalRecoveredOnThousand: Math.ceil(data.recovered / populationOnThousand), // общ, количество вылечившихся на 100к
      newConfirmednOnThousand: Math.ceil(data.todayCases / populationOnThousand), // last day кол-во заболевших на 100к
      newDeathnOnThousand: Math.ceil(data.todayDeaths / populationOnThousand), // last day количество смертей на 100к
      newRecoverdnOnThousand: Math.ceil(data.todayRecovered / populationOnThousand), // last day заболевших на 100к
    };
  });
  return item;
};

export function objSort(field) {
  return ((a,b) => a[field] > b[field] ? 1 : -1);
}
