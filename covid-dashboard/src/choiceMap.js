export default function choiceMap(condition, country, countryData) {

  const c = condition;

  if (c[0] === "Cases" && c[1] === "Last" && c[2] === "Absolute") {
    return [
      countryData[country].todayCases * 5, 
      countryData[country].todayCases
    ];
  }
  if (c[0] === "Cases" && c[1] === "All" && c[2] === "num-100000") {
    return [
      countryData[country].casesPerOneMillion, 
      countryData[country].casesPerOneMillion / 10
    ];
  }  
  if (c[0] === "Cases" && c[1] === "All" && c[2] === "Absolute") {
    return [
      countryData[country].cases / 20, 
      countryData[country].cases
    ];
  }
  if (c[0] === "Cases" && c[1] === "Last" && c[2] === "num-100000") {
    const inhabitantsOn100000 = countryData[country].population / 100000;
    if (inhabitantsOn100000) {
      return [
        countryData[country].todayCases / inhabitantsOn100000 * 500, 
        countryData[country].todayCases / inhabitantsOn100000
      ];
    }
    return [0, 0];
  }
  if (c[0] === "Death" && c[1] === "Last" && c[2] === "Absolute") {
    return [
      countryData[country].todayDeaths * 200, 
      countryData[country].todayDeaths
    ];
  }
  if (c[0] === "Death" && c[1] === "All" && c[2] === "num-100000") {
    return [
      countryData[country].deathsPerOneMillion * 40, 
      countryData[country].deathsPerOneMillion / 10
    ];
  }
  if (c[0] === "Death" && c[1] === "All" && c[2] === "Absolute") {
    return [
      countryData[country].deaths, 
      countryData[country].deaths
    ];
  }
  if (c[0] === "Death" && c[1] === "Last" && c[2] === "num-100000") {
    const inhabitantsOn100000 = countryData[country].population / 100000;
    if (inhabitantsOn100000) {
      return [
        countryData[country].todayDeaths / inhabitantsOn100000 * 20000, 
        countryData[country].todayDeaths / inhabitantsOn100000
      ];
    }
    return [0, 0];
  }
  if (c[0] === "Recovery" && c[1] === "Last" && c[2] === "Absolute") {
    return [
      countryData[country].todayRecovered * 10, 
      countryData[country].todayRecovered
    ];
  }
  if (c[0] === "Recovery" && c[1] === "All" && c[2] === "num-100000") {
    return [
      countryData[country].recoveredPerOneMillion, 
      countryData[country].recoveredPerOneMillion / 10
    ];
  }
  if (c[0] === "Recovery" && c[1] === "All" && c[2] === "Absolute") {
    return [
      countryData[country].recovered / 20, 
      countryData[country].recovered
    ];
  }
  if (c[0] === "Recovery" && c[1] === "Last" && c[2] === "num-100000") {
    const inhabitantsOn100000 = countryData[country].population / 100000;
    if (inhabitantsOn100000) {
      return [
        countryData[country].todayRecovered / inhabitantsOn100000 * 1000, 
        countryData[country].todayRecovered / inhabitantsOn100000
      ];
    }
    return [0, 0];
  }
  return null;
}