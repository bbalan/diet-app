// Round a number to the nearest divisor.
// roundTo(123.45, 10) == 120
export function roundTo(num, divisor) {
  const remainder = num % divisor

  if (remainder <= (divisor / 2)) {
    return num - remainder
  }

  return (num + divisor) - remainder
}

export function truncate(str, n, useWordBoundary = true) {
  const isTooLong = str.length > n
  let newStr = isTooLong ? str.substr(0, n - 1) : str

  if (useWordBoundary && isTooLong) {
    newStr = newStr.substr(0, newStr.lastIndexOf(' '))
    newStr = newStr.substr(0, newStr.lastIndexOf(','))
  }

  return isTooLong ? `${newStr}&hellip;` : newStr
}
