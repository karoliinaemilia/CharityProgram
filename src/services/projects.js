import axios from 'axios'
const baseUrl = 'https://d27jptknt5oqao.cloudfront.net/kesatyo_projektit.json'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }