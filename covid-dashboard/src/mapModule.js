import L from 'leaflet';
import { getData } from './getData.js';


export async function mapModule(parameter = 'Total cases') {
  const url = `https://corona.lmao.ninja/v3/covid-19/countries`;
  const countryData = await getData(url);

  function choseMap (condition, country) {
    switch(condition) {
      case 'Last day cases': return [
        countryData[country].todayCases * 10, 
        countryData[country].todayCases
      ];
      case 'On 100 000 population': return [
        countryData[country].casesPerOneMillion, 
        countryData[country].casesPerOneMillion / 10
      ];
      // case 'total cases': return [countryData[country].cases / 20, countryData[country].cases];
      default: return [
        countryData[country].cases / 20, 
        countryData[country].cases
      ];
    }
  }

  let legendSize;
  if (parameter === 'Last day cases') {
    legendSize = 'For every 10 meters of radius there is 1 case.';
  }
  if (parameter === 'On 100 000 population') {
    legendSize = 'For every 10 meters of radius there is 1 case.';
  }
  if (parameter === 'Total cases') {
    legendSize = 'For every 1 meter of radius there is 20 case.';
  }

  const mapOptions = {
    center: [53.902284, 27.561831],
    zoom: 4,
    maxZoom: 8,
    minZoom: 2,
    attributionControl: false, 
  }

  const map = new L.Map('map', mapOptions);
  const layer = new L.TileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png');
  map.addLayer(layer);

  
  for (let j = 0; j < countryData.length; j += 1) {
    const dataCircleValue = choseMap(parameter, j);
    const [country, lat, long] = [countryData[j].country, countryData[j].countryInfo.lat, countryData[j].countryInfo.long]
    const circle = L.circle([lat, long], {
      color: 'red',
      fillColor: 'red',
      fillOpacity: 1,
      radius: dataCircleValue[0]
      // radius: countryData[j].cases / 20
    }).addTo(map);

    circle.on('mouseover', () => {
      const popupLocation1 = new L.LatLng(lat, long);
      const popupContent1 = `${country}: ${parameter} ${dataCircleValue[1]}`;
      const popup1 = new L.Popup();
      popup1.setLatLng(popupLocation1);
      popup1.setContent(popupContent1);
      popup1.offset = new L.Point(0, -20);       
      map.addLayer(popup1);  
      circle.on('mouseout', () => {        
        map.closePopup(popup1);
        map.removeLayer(popup1);
      });
    });
  }
  
  const legendMap = L.control({ position: "topright" });
  legendMap.onAdd = () => {
    const div = L.DomUtil.create("div", "legend");
    div.innerHTML += `<h3>Legend</h3>`;
    div.innerHTML += `<h4>${parameter}</h4>`;
    div.innerHTML += `<p>The radius of the circle depends on the number of cases.</p>`;
    div.innerHTML += `<p>${legendSize}</p>`;
    return div;
  };
  legendMap.addTo(map);
  L.control.scale({
    metric: true,
    imperial: false
  }).addTo(map);

  const southWest = L.latLng(-180, -180);
  const northEast = L.latLng(180, 180);
  const bounds = L.latLngBounds(southWest, northEast);

  map.setMaxBounds(bounds);
  map.on('drag', ()  => {
    map.panInsideBounds(bounds, { animate: false });
  });

}