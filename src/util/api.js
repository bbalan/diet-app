export const USDA = 'USDA'
export const OTHER = 'OTHER'
export const CUSTOM = 'custom'
export const RECIPE = 'recipe'

export function searchUSDA(query, ds = 'Standard Reference', format = 'json', sort = 'r', max = 150, offset = 0) {
  return `http://api.nal.usda.gov/ndb/search/?format=${format}&sort=${sort}&max=${max}&offset=${offset}&api_key=sjikhTw3L6EptYE4CmjJs8QUKHPZNTEmQHCgmUUe&q=${query}&ds=${ds}`
}

export function foodReportUSDA(ndbno, type = 'b', format = 'json') {
  return `http://api.nal.usda.gov/ndb/reports/?ndbno=${ndbno}&type=${type}&format=${format}&api_key=sjikhTw3L6EptYE4CmjJs8QUKHPZNTEmQHCgmUUe`
}
