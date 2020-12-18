import getCovidCounty from "./dataFetch.js";

export const dataListCovid = async function () {
  const item = [];
  const rate = 100000;
  item.length = 0;
  try {
    const list = await getCovidCounty();
    list.forEach((data, ind) => {
      const populationOnThousand = data.population / rate;
      item[ind] = {
        country: data.country,
        flag: data.countryInfo.flag,
        totalConfirmed: data.cases, 
        totalDeath: data.deaths,
        totalRecovered: data.recovered, 
        newConfirmed: data.todayCases, 
        newDeath: data.todayDeaths,
        newRecoverd: data.todayRecovered, 
        totalConfirmedper100000: Math.ceil(data.cases / populationOnThousand), 
        totalDeathper100000: Math.ceil(data.deaths / populationOnThousand), 
        totalRecoveredper100000: Math.ceil(
          data.recovered / populationOnThousand
        ), 
        newConfirmedper100000: Math.ceil(
          data.todayCases / populationOnThousand
        ), 
        newDeathper100000: Math.ceil(data.todayDeaths / populationOnThousand),
        newRecoveredper100000: Math.ceil(
          data.todayRecovered / populationOnThousand
        ), 
      };
    });
  } catch (error) {
    return "err";
  }
  return item;
};

export function objSort(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}
