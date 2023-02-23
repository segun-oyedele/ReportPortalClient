import { BASE_URL } from "src/constants"

export const useFetchWithQuery = (endpoint, method = "GET") => {
  const url = `${BASE_URL}${endpoint}`
  return fetch(url, {
    method,
    headers: {
      "Content-type": "application/json",
    },
  })
}

export const usePatchWithQuery = (endpoint, method = "PATCH") => {
  const url = `${BASE_URL}${endpoint}`
  return fetch(url, {
    method,
    // headers: {
    //   "Content-type": "application/json",
    // },
  })
}

export const useFetch = (endpoint, data, method = "GET") => {
  const url = `${BASE_URL}${endpoint}`

  return fetch(url, {
    method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

export const useFetchAuth = (endpoint, data, method = "POST") => {
  const url = `${BASE_URL}${endpoint}`

  return fetch(url, {
    method,
    body: data,
  })
}
