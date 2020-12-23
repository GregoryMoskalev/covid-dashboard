export default function correctCountryName(country) {
  let countryOnClick = country;
  if (countryOnClick === "United Kingdom") {
    countryOnClick = "UK";
  }
  if (countryOnClick === "Island of Ireland") {
    countryOnClick = "Ireland";
  }
  if (countryOnClick === "United States of America") {
    countryOnClick = "USA";
  }
  if (countryOnClick ==="Republic of the Congo") {
    countryOnClick = "Congo";
  }
  if (countryOnClick === "Democratic Republic of the Congo") {
    countryOnClick = "DRC"
  }
  if (
    countryOnClick === "New Guinea Island" ||
    countryOnClick === "Borneo Island"
  ) {
    countryOnClick = "Indonesia";
  }
  if (countryOnClick === "Libya") {
    countryOnClick = "Liberia";
  }
  if (countryOnClick === "Republic of Korea") {
    countryOnClick = "S. Korea";
  }
  if (countryOnClick === "Syria") {
    countryOnClick = "Syrian Arab Republic";
  }
  if (countryOnClick === "Republic of South Africa") {
    countryOnClick = "South Africa";
  }
  if (countryOnClick === "Panamá") {
    countryOnClick = "Panama";
  }
  if (countryOnClick === "Plurinational State of Bolivia") {
    countryOnClick = "Bolivia";
  }
  if (countryOnClick === "Bosnia and Herzegovina") {
    countryOnClick = "Bosnia";
  }
  if (countryOnClick === "North Macedonia") {
    countryOnClick = "Macedonia";
  }
  if (countryOnClick === "peski") {
    countryOnClick = undefined;
  }
  return countryOnClick;
}