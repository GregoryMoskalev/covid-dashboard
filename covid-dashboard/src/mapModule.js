import L from "leaflet";
import { getData } from "./getData.js";
import { createEl } from "./createEl.js";
import refreshMap from "./refreshMap.js";
import choiceMap from "./choiceMap.js";
import imgUrl from "./img/fs.png";

export async function mapModule(
  parameter = ["Cases", "All", "Absolute"],
  mapEl = "map",
  isFullScreen = false
) {
  const url = `https://corona.lmao.ninja/v3/covid-19/countries`;
  const countryData = await getData(url);
  const mapContainer = document.querySelector("#map-container");
  const copyParameter = [...parameter];
  const mapSelector = createEl(mapContainer, "div", "", "map");
  // const mapSelector = document.querySelector("#map");
  // function choiceMap(condition, country) {
  //   switch (condition) {
  //     case "Last day cases":
  //       return [
  //         countryData[country].todayCases * 10,
  //         countryData[country].todayCases,
  //       ];
  //     case "On 100 000 population":
  //       return [
  //         countryData[country].casesPerOneMillion,
  //         countryData[country].casesPerOneMillion / 10,
  //       ];
  //     default:
  //       return [countryData[country].cases / 20, countryData[country].cases];
  //   }
  // }
  const mapOptions = {
    center: [53.902284, 27.561831],
    zoom: 4,
    maxZoom: 7,
    minZoom: 3,
    attributionControl: false,
    fullscreenControl: true,
  };

  const map = new L.Map(mapEl, mapOptions);
  const layer = new L.TileLayer(
    "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
  );
  map.addLayer(layer);

  // Dark theme - https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png

  for (let j = 0; j < countryData.length; j += 1) {
    const dataCircleValue = choiceMap(parameter, j, countryData);
    const [country, lat, long] = [
      countryData[j].country,
      countryData[j].countryInfo.lat,
      countryData[j].countryInfo.long,
    ];
    const circle = L.circle([lat, long], {
      color: "red",
      fillColor: "red",
      fillOpacity: 1,
      radius: dataCircleValue[0],
    }).addTo(map);

    circle.on("mouseover", () => {
      const popupLocation1 = new L.LatLng(lat, long);
      const popupContent1 = `${country}: ${parameter} ${dataCircleValue[1]}`;
      const popup1 = new L.Popup();
      popup1.setLatLng(popupLocation1);
      popup1.setContent(popupContent1);
      popup1.offset = new L.Point(0, -20);
      map.addLayer(popup1);
      circle.on("mouseout", () => {
        map.closePopup(popup1);
        map.removeLayer(popup1);
      });
    });
  }

  // TODO: Вместо console.log вставить ф-ию для передачи cтраны в др. блоки (if(countryOnClick) function())
  // Country on click
  map.on("click", async (e) => {
    // const t = e.target;
    // console.log(t)
    // if (target.closest('.leaflet-control-container')) return;
    let coords = e.latlng.toString().slice(7, -1).split(" ");
    const [a, b] = coords;
    coords = `${b},${a.slice(0, -1)}`;

    const clickData = await getData(
      `https://geocode-maps.yandex.ru/1.x/?apikey=40f6c358-457e-4cf2-bf12-4c022fbc83f6&geocode=${coords}&lang=en_US&format=json`
    );
    const countryOnClick =
      clickData?.response?.GeoObjectCollection?.featureMember[1]?.GeoObject
        ?.metaDataProperty?.GeocoderMetaData?.AddressDetails?.Country
        ?.CountryName;
    console.log(countryOnClick);
  });

  function onOverlayAdd(e) {
    e.stopPropagation();
  }
  map.on("overlayadd", onOverlayAdd);
  // map.addSource('countries', {
  //   type: 'geojson',
  //   data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson',
  // });

  // Legend
  const legendMap = L.control({ position: "bottomleft" });
  const onFullScreen = L.control({ position: "topright" });
  const typeInfo = L.control({ position: "bottomright" });
  const timeInfo = L.control({ position: "bottomright" });
  const valueInfo = L.control({ position: "bottomright" });
  let legendSize;

  // if (parameter === "Last day cases" || parameter === "On 100 000 population") {
  //   legendSize = "For every 10 meters of radius there is 1 case.";
  // }
  // if (parameter === "Total cases") {
  //   legendSize = "For every 1 meter of radius there is 20 case.";
  // }

  typeInfo.onAdd = () => {
    const listInfo = L.DomUtil.create("select", "list-Info__type");
    listInfo.innerHTML = `<option value="Cases" id='Cases' >Cases of ill </option>
    <option value="Death" id='Death'>Death</option>
    <option value="Recovery" id='Recovery'>Recovery</option>`;
    return listInfo;
  };

  typeInfo.addTo(map);

  timeInfo.onAdd = () => {
    const listInfo = L.DomUtil.create("select", "list-Info__time");
    listInfo.innerHTML = `<option value="All" id='All' >For all time</option>
    <option value="Last" id='Last'>For last day</option>`;
    return listInfo;
  };

  timeInfo.addTo(map);

  valueInfo.onAdd = () => {
    const listInfo = L.DomUtil.create("select", "list-Info__value");
    listInfo.innerHTML = `<option value="Absolute" id='Absolute'>Absolute </option>
    <option value="num-100000" id='num-100000'>On 100000</option>`;
    return listInfo;
  };

  valueInfo.addTo(map);

  onFullScreen.onAdd = () => {
    const img = L.DomUtil.create("img", "img-full-screen");
    img.setAttribute("src", imgUrl);
    return img;
  };
  onFullScreen.addTo(map);

  legendMap.onAdd = () => {
    const div = L.DomUtil.create("div", "legend");
    div.innerHTML += `<h3>Legend</h3>`;
    div.innerHTML += `<h4>${parameter}</h4>`;
    div.innerHTML += `<p>The radius of the circle depends on the number of cases.</p>`;
    div.innerHTML += `<p>${legendSize}</p>`;
    return div;
  };
  legendMap.addTo(map);

  L.control.scale({ imperial: false }).addTo(map);

  // Block scroll multi map
  const southWest = L.latLng(-90, -180);
  const northEast = L.latLng(90, 180);
  const bounds = L.latLngBounds(southWest, northEast);

  map.setMaxBounds(bounds);
  map.on("drag", () => {
    map.panInsideBounds(bounds, { animate: false });
  });

  if (isFullScreen) {
    mapSelector.classList.add("active");
    setTimeout(() => map.invalidateSize(), 200);
  }
  // Full screen button
  const onFullScreenBtn = document.querySelector(".img-full-screen");
  onFullScreenBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    mapSelector.classList.toggle("active");
    setTimeout(() => map.invalidateSize(), 200);
  });

  // List info control
  function changeConfig(selector, numberParameter) {
    const el = document.querySelector(selector);
    el.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    el.addEventListener("change", (e) => {
      const fullScreenParameter = mapSelector.classList.contains("active");
      console.log(fullScreenParameter);
      copyParameter[numberParameter] = e.target.value;
      refreshMap(() => mapModule(copyParameter, "map", fullScreenParameter));
    });
  }
  changeConfig(".list-Info__type", 0);
  changeConfig(".list-Info__time", 1);
  changeConfig(".list-Info__value", 2);
  for (let i = 0; i < parameter.length; i += 1) {
    // console.log(parameter);
    const selectedElement = document.querySelector(`#${parameter[i]}`);
    selectedElement.setAttribute("selected", "selected");
  }
}
