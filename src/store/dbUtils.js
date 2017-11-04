import db from 'store/db'

// Set a key/value pair in a given table.
// Cuts down on boilerplate code, as there are multiple tables storing key/value data
export default function setKeyValue({ commit }, tableName, key, value, callback = () => {}) {
  return new Promise((resolve) => {
    db[tableName]
      .where('id').equals(1)
      .modify({ [key]: value })
      .then(() => {
        commit(key, value)
        callback()
        console.log('resolve', key)
        resolve()
      })
  })
}
