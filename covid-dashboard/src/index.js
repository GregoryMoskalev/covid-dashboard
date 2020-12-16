import './scss/main.scss';
import Table from './Table.js';
import Chart from './Chart.js';

const tb = new Table();
const ch = new Chart();

tb.init();
ch.renderCanvas();
