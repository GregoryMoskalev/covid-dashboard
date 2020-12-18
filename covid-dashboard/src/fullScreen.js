function openFull() {
  document.querySelector(".list").classList.toggle("full-screen");
}

export default function fullScreen() {
  const btn = document.querySelector(".btn__full");
  btn.addEventListener("click", openFull);
}
