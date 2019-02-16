import axios from 'axios'
import axiosRetry from 'axios-retry'
 
axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
})

let url = null

let token = null

const config = () => {
  return {
    headers: { 'Authorization': token }
  }
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const setUrl = (newUrl) => {
  url = `${newUrl}/targets`
}

const getAll = async () => {
  console.log('TARGETS trying to connect to:', url)

  const response = await axios.get(url, config())

  console.log('got all targets!')

  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(url, newObject, config())

  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${url}/${id}`, updatedObject, config())

  return response.data
}

export default { setToken, getAll, create, update, setUrl }
