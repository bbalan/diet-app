import { USDA, CUSTOM } from 'util/api'

// Check response status, when making fetch requests. Not sure if this works...
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

// Returns JSON from a successful fetch request
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

// Compute the value of a nutrient in a food, proportional to the amount of that food eaten.
export function computeNutrient(foodDetails, customID, USDA_ID) {
  let total = 0
  let energy
  let value

  foodDetails.forEach((item) => {
    switch (item.source) {
      case USDA:
        if (item && item.dataFood && item.dataFood.nutrients) {
          energy = item.dataFood.nutrients.find(
            nutrient => nutrient.nutrient_id === USDA_ID
          )

          if (energy && energy.value) {
            value = parseInt(energy.value, 10) * item.mass / 100
            total += value
          }
        }
        break
      case CUSTOM:
        if (item && item.dataFood && item.dataFood[customID]) {
          total += item.dataFood[customID] / item.dataFood.serving * item.mass
        }
        break
      default:
        total += 0
        break
    }
  })

  return total
}
