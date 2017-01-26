export function roundTo(val, num) {
  const resto = val % num;
  if (resto <= (num / 2)) {
    return val - resto;
  }

  return (val + num) - resto;
}

export function setLocalStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}
