import axios from 'axios'

import { API_URL } from './config'

export function configureHttpClient() {
  let baseURL: string
  if (!!API_URL) baseURL = `${API_URL}`
  else baseURL = 'https://dev.workbc.ca/sao/api' // fallback

  axios.defaults.headers['Content-Type'] = 'application/json'

  axios.defaults.baseURL = baseURL
}
