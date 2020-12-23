import Chart from "chart.js";
import fetchChartsData from "./fetchChartsData.js";
import {
  convertNumberToSI,
  convertDateUSToEU,
  dailyFromCumulative,
  newHtmlElement,
} from "./utilities.js";

export default class Charts {
  constructor() {
    this.fetchChartsData = fetchChartsData;
    this.rate = 100000;
    [this.chartParent] = document.body.getElementsByClassName("chart-wrapper");

    this.onChangeCalcChart = (evt) => {
      this.selectorCalc = evt.target.value;
      this.renderMyCharts(
        Number(this.selectorTime),
        Number(this.selectorCalc),
        this.mod,
        this.country
      );
    };

    this.onChangeTimeChart = (evt) => {
      this.selectorTime = evt.target.value;
      this.renderMyCharts(
        Number(this.selectorTime),
        Number(this.selectorCalc),
        this.mod,
        this.country
      );
    };
  }

  async renderMyCharts(time, rate, mod, country) {
    if (this.country === country || !this.response) {
      this.response = await this.fetchChartsData(country);
    }
    this.country = country;
    this.ctx = [];

    const data = {
      cases: Object.values(this.response.cases).map((el) =>
        !rate ? el : +(el / mod).toFixed(2)
      ),
      deaths: Object.values(this.response.deaths).map((el) =>
        !rate ? el : (el / mod).toFixed(2)
      ),
      recovered: Object.values(this.response.recovered).map((el) =>
        !rate ? el : (el / mod).toFixed(2)
      ),
    };

    this.cumulativeData = [
      ["Cases", "Deaths", "Recovered"],
      [data.cases, data.deaths, data.recovered],
    ];
    this.dailyData = [
      ["Cases", "Deaths", "Recovered"],
      [
        dailyFromCumulative(data.cases),
        dailyFromCumulative(data.deaths),
        dailyFromCumulative(data.recovered),
      ],
    ];
    if (!this.chart) {
      this.myChart = newHtmlElement("div", "chart");
      this.myChart.appendChild(
        this.renderControl(
          ["Total", "Per 100000 people"],
          this.onChangeCalcChart
        )
      );
      this.myChart.appendChild(
        this.renderControl(["Cumulative", "Daily"], this.onChangeTimeChart)
      );
      this.chartParent.appendChild(this.myChart);
      this.ctx = newHtmlElement("canvas");
      this.myChart.appendChild(this.ctx);

      this.renderChart(
        time === 0 ? this.cumulativeData : this.dailyData,
        Object.keys(this.response.cases),
        rate,
        time
      );
    } else {
      this.reRenderChart(
        time === 0 ? this.cumulativeData : this.dailyData,
        Object.keys(this.response.cases),
        rate,
        time
      );
    }

    this.renderFullScreenBtnCharts();
    this.handleFullScreenBtnCharts();
  }

  renderChart(data, label, rate, time) {
    this.chart = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: label,
        datasets: [
          {
            label: data[0][0],
            data: data[1][0],
            backgroundColor: "#212121",
            borderColor: "#212121",
            fill: "Disabled",
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 2,
          },
          {
            label: data[0][1],
            data: data[1][1],
            backgroundColor: "#d50000",
            borderColor: "#d50000",
            fill: "Disabled",
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 2,
          },
          {
            label: data[0][2],
            data: data[1][2],
            backgroundColor: "#4caf50",
            borderColor: "#4caf50",
            fill: "Disabled",
            pointRadius: 0,
            lineTension: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: `${!this.country ? "Global" : this.country}, ${
            !rate ? "" : "Per 100k, "
          }${!time ? "Cumulative" : "Daily"}`,
        },
        tooltips: {
          callbacks: {
            title: (item) => {
              return convertDateUSToEU([item[0].xLabel]);
            },
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: (value) => convertNumberToSI(value),
              },
            },
          ],
          xAxes: [
            {
              type: "time",
              time: {
                unit: "month",
              },
            },
          ],
        },
      },
    });
  }

  reRenderChart(data, label, rate, time) {
    this.chart.data.labels = label;
    this.chart.data.datasets = [
      {
        label: data[0][0],
        data: data[1][0],
        backgroundColor: "#212121",
        borderColor: "#212121",
        fill: "Disabled",
        pointRadius: 0,
        lineTension: 0,
        borderWidth: 2,
      },
      {
        label: data[0][1],
        data: data[1][1],
        backgroundColor: "#d50000",
        borderColor: "#d50000",
        fill: "Disabled",
        pointRadius: 0,
        lineTension: 0,
        borderWidth: 2,
      },
      {
        label: data[0][2],
        data: data[1][2],
        backgroundColor: "#4caf50",
        borderColor: "#4caf50",
        fill: "Disabled",
        pointRadius: 0,
        lineTension: 0,
        borderWidth: 2,
      },
    ];
    this.chart.options = {
      title: {
        display: true,
        text: `${!this.country ? "Global" : this.country}, ${
          !rate ? "" : "Per 100k, "
        }${!time ? "Cumulative" : "Daily"}`,
      },
      tooltips: {
        callbacks: {
          title: (item) => {
            return convertDateUSToEU([item[0].xLabel]);
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              callback: (value) => convertNumberToSI(value),
            },
          },
        ],
        xAxes: [
          {
            type: "time",
            time: {
              unit: "month",
            },
          },
        ],
      },
    };

    this.chart.update();
  }

  renderFullScreenBtnCharts() {
    this.fullScreenBtnCharts = newHtmlElement("div", "btn-full-screen");
    this.fullScreenBtnCharts.classList.add("material-icons");

    this.myChart.appendChild(this.fullScreenBtnCharts);
  }

  handleFullScreenBtnCharts() {
    this.fullScreenBtnCharts.addEventListener("click", () => {
      this.fullScreenBtnCharts.parentNode.classList.toggle("full-screen");
    });
  }

  renderControl(options, callback) {
    if (!this.select) {
      this.select = [];
    }
    this.select.push(newHtmlElement("select", "selector"));

    options.forEach((option, index) => {
      const op = newHtmlElement("option", "option", option);
      op.value = index;
      this.select[this.select.length - 1].appendChild(op);
    });

    this.select[this.select.length - 1].addEventListener("change", (evt) =>
      callback(evt)
    );
    return this.select[this.select.length - 1];
  }
}
