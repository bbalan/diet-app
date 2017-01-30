export function USDAsearch(query, format = 'json', sort = 'n', max = 150, offset = 0, ds = 'Standard Reference') {
  return `http://api.nal.usda.gov/ndb/search/?format=${format}&sort=${sort}&max=${max}&offset=${offset}&api_key=sjikhTw3L6EptYE4CmjJs8QUKHPZNTEmQHCgmUUe&q=${query}&ds=${ds}`
}

export function USDAfoodReport(ndbno, type = 'b', format = 'json') {
  return `http://api.nal.usda.gov/ndb/reports/?ndbno=${ndbno}&type=${type}&format=${format}&api_key=sjikhTw3L6EptYE4CmjJs8QUKHPZNTEmQHCgmUUe`
}
