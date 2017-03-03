export const USDA = 'USDA'
export const OTHER = 'OTHER'
export const CUSTOM = 'custom'
export const RECIPE = 'recipe'

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export function parseJSON(response) {
  return response.json()
}
