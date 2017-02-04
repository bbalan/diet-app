// Shorthand for settings a key/value pair in localStorage
export function setLocalStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val, null, ''))
}

export const blah = {}
