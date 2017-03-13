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

export default db
