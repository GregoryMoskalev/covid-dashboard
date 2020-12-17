import './scss/main.scss';
import Table from './Table.js';
import Charts from './Charts.js';

const tb = new Table();
const ch = new Charts();

tb.init();
ch.renderMyChart();
