import './scss/main.scss';
import Table from './Table.js';

const tb = new Table();

tb.init();

setTimeout(() => {
  tb.setRegionData('Russia');
}, 5000);
