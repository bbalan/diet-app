import store from 'store'
import { roundTo } from 'util'

// Convert mass in kg to kg or lbs depending on user setting
export function toMassUnit(mass) {
  const metric = Math.floor(roundTo(mass, 0.1) * 10) / 10
  const imperial = Math.floor(roundTo(mass * 2.20462, 0.1) * 10) / 10

  switch (store.state.appSettings.unitWeight) {
    case 'metric': return `${metric} kg`
    case 'imperial': return `${imperial} lbs`
    default: return ''
  }
}

// Append 'kcal' to calorie readouts
export function toKcal(calories) {
  return `${calories} kcal`
}
