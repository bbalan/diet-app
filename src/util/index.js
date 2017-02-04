// Round a number to the nearest divisor.
// roundTo(123.45, 10) == 120
export function roundTo(num, divisor) {
  const remainder = num % divisor

  if (remainder <= (divisor / 2)) {
    return num - remainder
  }

  return (num + divisor) - remainder
}

export const foo = {}
