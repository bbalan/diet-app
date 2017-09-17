import Dexie from 'dexie'

const db = new Dexie('simplyFit')

db.version(1)
  .stores({
    recipes: '++id, cacheUUID, name, ingredients, nutrients, enabled',
    calendar: '&date, userInfo, entries',
    friends: '++id, name, age',
    entries: '++id, item, type, data, enabled, checked',
    workouts: '++id, name, calories',
  })

export default db
