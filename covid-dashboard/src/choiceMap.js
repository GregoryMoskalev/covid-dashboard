export default function choiceMap(condition, country, countryData) {
  const c = condition;

  if (c[0] === "Cases" && c[1] === "Last" && c[2] === "Absolute") {
    return [
      countryData[country].todayCases * 5,
      Math.round(countryData[country].todayCases),
      "Cases in last day in absolute terms",
      "For every 5 meters of radius there is 1 case.",
    ];
  }
  if (c[0] === "Cases" && c[1] === "All" && c[2] === "num-100000") {
    return [
      countryData[country].casesPerOneMillion,
      Math.round(countryData[country].casesPerOneMillion / 10),
      "Cases for all time per 100 000 population",
      "For every 10 meters of radius there is 1 case.",
    ];
  }
  if (c[0] === "Cases" && c[1] === "All" && c[2] === "Absolute") {
    return [
      countryData[country].cases / 20,
      Math.round(countryData[country].cases),
      "Cases for all time in absolute terms",
      "For every 1 meter of radius there is 20 case.",
    ];
  }
  if (c[0] === "Cases" && c[1] === "Last" && c[2] === "num-100000") {
    const inhabitantsOn100000 = countryData[country].population / 100000;
    if (inhabitantsOn100000) {
      return [
        (countryData[country].todayCases / inhabitantsOn100000) * 500,
        Math.round(countryData[country].todayCases / inhabitantsOn100000),
        "Cases in last day per 100 000 population",
        "For every 500 meters of radius there is 1 case.",
      ];
    }
    return [0, 0];
  }
  if (c[0] === "Death" && c[1] === "Last" && c[2] === "Absolute") {
    return [
      countryData[country].todayDeaths * 200,
      Math.round(countryData[country].todayDeaths),
      "Death in last day in absolute terms",
      "For every 200 meters of radius there is 1 case.",
    ];
  }
  if (c[0] === "Death" && c[1] === "All" && c[2] === "num-100000") {
    return [
      countryData[country].deathsPerOneMillion * 40,
      Math.round(countryData[country].deathsPerOneMillion / 10),
      "Death for all time per 100 000 population",
      "For every 400 meters of radius there is 1 case.",
    ];
  }
  if (c[0] === "Death" && c[1] === "All" && c[2] === "Absolute") {
    return [
      countryData[country].deaths,
      Math.round(countryData[country].deaths),
      "Death for all time in absolute terms",
      "For every 1 meters of radius there is 1 case.",
    ];
  }
  if (c[0] === "Death" && c[1] === "Last" && c[2] === "num-100000") {
    const inhabitantsOn100000 = countryData[country].population / 100000;
    if (inhabitantsOn100000) {
      return [
        (countryData[country].todayDeaths / inhabitantsOn100000) * 20000,
        Math.round(countryData[country].todayDeaths / inhabitantsOn100000),
        "Death in last day per 100 000 population",
        "For every 20000 meters of radius there is 1 case.",
      ];
    }
    return [0, 0];
  }
  if (c[0] === "Recovery" && c[1] === "Last" && c[2] === "Absolute") {
    return [
      countryData[country].todayRecovered * 10,
      Math.round(countryData[country].todayRecovered),
      "Recovery in last day in absolute terms",
      "For every 10 meters of radius there is 1 case.",
    ];
  }
  if (c[0] === "Recovery" && c[1] === "All" && c[2] === "num-100000") {
    return [
      countryData[country].recoveredPerOneMillion,
      Math.round(countryData[country].recoveredPerOneMillion / 10),
      "Recovery for all time per 100 000 population",
      "For every 10 meters of radius there is 1 case.",
    ];
  }
  if (c[0] === "Recovery" && c[1] === "All" && c[2] === "Absolute") {
    return [
      countryData[country].recovered / 20,
      Math.round(countryData[country].recovered),
      "Recovery for all time in absolute terms",
      "For every 1 meter of radius there is 20 case.",
    ];
  }
  if (c[0] === "Recovery" && c[1] === "Last" && c[2] === "num-100000") {
    const inhabitantsOn100000 = countryData[country].population / 100000;
    if (inhabitantsOn100000) {
      return [
        (countryData[country].todayRecovered / inhabitantsOn100000) * 1000,
        Math.round(countryData[country].todayRecovered / inhabitantsOn100000),
        "Recovery in last day per 100 000 population",
        "For every 1000 meter of radius there is 1 case.",
      ];
    }
    return [0, 0];
  }
  return null;
}
