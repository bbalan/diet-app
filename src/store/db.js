import Dexie from 'dexie';

const db = new Dexie('testdb');

db.version(1).stores({
  friends: '++id, name, age',
});

export default db
