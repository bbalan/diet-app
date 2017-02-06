import store from 'store'

// Convert mass in kg to kg or lbs depending on user setting
export function toMassUnit(mass) {
  switch (store.state.appSettings.unitWeight) {
    case 'metric': return `${Math.floor(mass * 10) / 10} kg`
    case 'imperial': return `${Math.floor(mass * 2.20462 * 10) / 10} lbs`
    default: return false
  }
}

// Append 'kcal' to calorie readouts
export function toKcal(calories) {
  return `${calories} kcal`
}
