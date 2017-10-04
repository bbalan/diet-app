import Dexie from 'dexie'

const db = new Dexie('simplyFit')

db.version(1)
  .stores({
    entries: '++id, item, type, data, enabled, checked',
    calendar: '&date, userInfo, entries',
    recipes: '++id, cacheUUID, name, ingredients, nutrients, enabled',
    workouts: '++id, name, calories',
  })

export default db
