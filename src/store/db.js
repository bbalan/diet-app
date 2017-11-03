import Dexie from 'dexie'

const db = new Dexie('simplyFit')

db.version(1)
  .stores({
    entries: '++id, item, type, data, enabled, checked',
    calendar: '&date, userInfo, entries',
    recipes: '++id, cacheUUID, name, ingredients, nutrients, enabled',
    workouts: '++id, name, calories',
  })

db.version(2)
  .stores({
    entries: '++id, item, type, data, enabled, checked',
    calendar: '&date, userInfo, entries',
    recipes: '++id, cacheUUID, name, ingredients, nutrients, enabled',
    userInfo: 'firstName, lastName, fullName, email, birthday, age, gender, height, weight, bodyFatPct, mass, tdee, numMeals, mealStops, goal, goalSpeed, activityLevel',
    workouts: '++id, name, calories',
  })

db.version(3)
  .stores({
    entries: '++id, item, type, data, enabled, checked',
    calendar: '&date, userInfo, entries',
    recipes: '++id, cacheUUID, name, ingredients, nutrients, enabled',
    userInfo: '++id, firstName, lastName, fullName, email, birthday, age, gender, height, weight, bodyFatPct, mass, tdee, numMeals, mealStops, goal, goalSpeed, activityLevel',
    workouts: '++id, name, calories',
  })

export default db

// Set a key/value pair in a given table.
// Cuts down on boilerplate code, as there are multiple tables storing key/value data
export function setKeyValue({ commit }, tableName, key, value, callback = () => {}) {
  return new Promise((resolve) => {
    db[tableName]
      .update(0, { [key]: value })
      .then(() => {
        commit(key, value)
        callback()
        resolve()
      })
  })
}
