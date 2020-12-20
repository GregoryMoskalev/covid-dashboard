export default function refreshMap(newFunc) {
  const node = document.querySelector("#map");
  node.parentNode.removeChild(node);
  newFunc();
};