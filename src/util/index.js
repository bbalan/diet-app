import router from 'router'

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export function parseJSON(response) {
  return response.json()
}

// Round a number to the nearest divisor.
// roundTo(123.45, 5) == 125
export function roundTo(num, divisor) {
  const remainder = num % divisor

  if (remainder <= (divisor / 2)) {
    return num - remainder
  }

  return (num + divisor) - remainder
}

// Truncate a long string on word break, and add ellipses
export function truncate(str, n, useWordBoundary = true) {
  if (!str || !n) return 'error'

  const isTooLong = str.length > n
  let newStr = isTooLong ? str.substr(0, n - 1) : str

  if (useWordBoundary && isTooLong) {
    newStr = newStr.substr(0, newStr.lastIndexOf(' '))
    newStr = newStr.substr(0, newStr.lastIndexOf(','))
  }

  return isTooLong ? `${newStr}&hellip;` : newStr
}

// Select contents of an input on click or focus
export function onFocusInput(ref) {
  this.$refs[ref].$el.querySelector('input').select()
}

let iterations = 0

// Go back to a named route
// TODO: this code seems fragile
export function routerBackTo(routeName) {
  setTimeout(() => {
    const matched = router.match(location.pathname)

    if (matched.name !== routeName && iterations < 10) {
      iterations += 1
      router.go(-1)
      routerBackTo(routeName)
    }
  }, 100)
}
