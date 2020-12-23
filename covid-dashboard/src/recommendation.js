import createEl from "./createEl.js";

export default function recommendation() {
  const container = document.querySelector('.recommendation');
  container.innerHTML = `<h3>Useful links</h3>`;
  const list = createEl(container, "ul", "recommendation-list");
  list.innerHTML = `<li><a href="https://xn--80aesfpebagmfblc0a.xn--p1ai/" target="_blank">Last news</a></li>
  <li><a href="https://gosfondspb.ru/revenue/covid-19-pamyatka/" target="_blank">Prevention</a></li>
  <li><a href="https://coronavirus-monitor.ru/posts/sovety/zabolel-koronavirusom/" target="_blank">What to do if you get sick</a></li>`;
}