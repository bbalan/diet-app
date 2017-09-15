import Dexie from 'dexie';

const db = new Dexie('simplyFit');

db.version(1)
  .stores({
    entries: '++id, item, type, data',
  });

db.version(2)
  .stores({
    friends: '++id, name, age',
    entries: '++id, item, type, data',
  })

db.version(3)
  .stores({
    friends: '++id, name, age',
    entries: '++id, item, type, data, enabled, checked',
  })

db.version(4)
  .stores({
    friends: '++id, name, age',
    entries: '++id, item, type, data, enabled, checked',
    workouts: '++id, name, calories',
  })

db.version(5)
  .stores({
    calendar: '++id, date, userInfo, metrics',
    friends: '++id, name, age',
    entries: '++id, item, type, data, enabled, checked',
    workouts: '++id, name, calories',
  })

db.version(6)
  .stores({
    recipes: '++id, cacheUUID, name, ingredients, nutrients, enabled',
    calendar: '++id, date, userInfo, entries',
    friends: '++id, name, age',
    entries: '++id, item, type, data, enabled, checked',
    workouts: '++id, name, calories',
  })

db.version(7)
  .stores({
    recipes: '++id, cacheUUID, name, ingredients, nutrients, enabled',
    calendar: '&date, userInfo, entries',
    friends: '++id, name, age',
    entries: '++id, item, type, data, enabled, checked',
    workouts: '++id, name, calories',
  })

export default db
