import L from 'leaflet';
import { getData } from './getData.js';


export async function mapModule(parameter = 'total cases') {
  const url = `https://corona.lmao.ninja/v3/covid-19/countries`;
  const countryData = await getData(url);

  function choseMap (condition, country) {
    switch(condition) {
      case 'last day cases': return [countryData[country].todayCases * 10, countryData[country].todayCases];
      case 'on 100 000 population': return [countryData[country].casesPerOneMillion, countryData[country].casesPerOneMillion];
      // case 'total cases': return [countryData[country].cases / 20, countryData[country].cases];
      default: return [countryData[country].cases / 20, countryData[country].cases];
    }
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
  const southWest = L.latLng(-180, -180);
  const northEast = L.latLng(180, 180);
  const bounds = L.latLngBounds(southWest, northEast);

  map.setMaxBounds(bounds);
  map.on('drag', ()  => {
    map.panInsideBounds(bounds, { animate: false });
  });
}