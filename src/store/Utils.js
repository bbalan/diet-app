export default function setLocalStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}
