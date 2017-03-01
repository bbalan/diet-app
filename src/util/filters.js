import store from 'store'

export function roundTo(val, decimals = 0) {
  if (val === undefined || val === null || decimals < 0) return null

  const d = 10 * decimals || 1
  return Math.floor(val * d) / d
}

// Convert mass in kg to kg or lbs depending on user setting
export function toMassUnit(mass) {
  const kg = Math.floor(mass * 10) / 10
  const lbs = Math.floor(mass * 2.20462 * 10) / 10

  switch (store.state.config.unitWeight) {
    case 'kg': return `${kg} kg`
    case 'lbs': return `${lbs} lbs`
    default: return ''
  }
}

// Append 'kcal' to calorie readouts
export function toKcal(calories) {
  return `${calories} kcal`
}

export function capitalize(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}
