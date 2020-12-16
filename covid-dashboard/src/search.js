// import {Keyboard} from "./keyboard.js"

export function inputSearch(event, input) {
  const value = input.value.trim();
  const  reg = new RegExp(value, 'gi');
  const  items = document.querySelectorAll('.country');
  if (input !== '' ) {
    items.forEach((elem) => {
      if (elem.innerHTML.search(reg) === -1){
        elem.classList.add('hide');
      }
      else {
        elem.classList.remove('hide');
      }
    })
  }
  else {
    items.forEach((elem) => {
      elem.classList.remove('hide');
    })
  }
}

export default function liveSearch() {
    const input = document.querySelector('.list__search');
    input.addEventListener('input', (event) => inputSearch(event, input))
}




