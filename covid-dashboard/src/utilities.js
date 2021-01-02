function convertNumberToSI(number) {
  if (Number(number) >= 1.0e6) {
    return `${Number(number) / 1.0e6}M`;
  }
  if (Number(number) >= 1.0e3) {
    return `${Number(number) / 1.0e3}k`;
  }
  return Number(number);
}

function monthFromNumber(number) {
  const monthName = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return monthName[new Date(number).getMonth()];
}

function convertDateUSToEU(dataArr) {
  const arr = [];

  dataArr.forEach((dateUs) => {
    const date = new Date(dateUs);
    arr.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
  });

  return arr;
}

function dailyFromCumulative(dataArr) {
  const arr = [ ...dataArr ];
  return arr.map((n, i) => {
    if (i > 0) {
      const daily = n - arr[i - 1];
      return daily > 0 ? Number(daily.toFixed(2)) : 0;
    }
    return n;
  });
}

function newHtmlElement(tag, className, iHtml = null) {
  const element = document.createElement(tag);
  element.classList.add(className);
  if (iHtml) {
    element.innerHTML = iHtml;
  }
  return element;
}

export {
  convertNumberToSI,
  monthFromNumber,
  convertDateUSToEU,
  dailyFromCumulative,
  newHtmlElement,
};
