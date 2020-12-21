export default function createEl(
  parent,
  tag = "div",
  className = "",
  idName = "",
  content = ""
) {
  const el = document.createElement(tag);
  el.className = className;
  el.id = idName;
  el.innerHTML = content;
  if (parent) {
    parent.appendChild(el);
  }
  return el;
}
