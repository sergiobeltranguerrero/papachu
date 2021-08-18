import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('/api/record', {
    headers: { Authorization: `bearer ${localStorage.getItem('library-user-token')}` }
  })
  return response.data
}

const createNewRecord = async ({ entryTime, departureTime, date }) => {
  const record = {
    entryTime,
    departureTime,
    date
  }
  const response = await axios.post('/api/record', record, {
    headers: { Authorization: `bearer ${localStorage.getItem('library-user-token')}` }
  })
  return response.data
}

export default { getAll, createNewRecord }
