export default function liveSearch() {

  const input = document.querySelector('.list__search');
  input.oninput = function () {
    const value = this.value.trim();
    const  items = document.querySelectorAll('.country');
    if (input !== '') {
      items.forEach((elem) => {
        if (elem.innerHTML.search(value) === -1){
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
}