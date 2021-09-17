import axios from 'axios'

const getAll = async (year) => {
  return await axios.get(`/api/record/${year}`, {
    headers: { Authorization: `bearer ${localStorage.getItem('library-user-token')}` }
  }).then((response) => {
    return response.data
  }).catch(error => {
    if (error.response.status === 401) {
      return null
    }
    return error
  })
}

export default { getAll }
