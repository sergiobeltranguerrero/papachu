import axios from 'axios'

const getAll = async () => {
  return await axios.get('/api/record', {
    headers: { Authorization: `bearer ${localStorage.getItem('library-user-token')}` }
  }).then((response) => {
    return response.data
  }
  ).catch(error => {
    if (error.response.status === 401) {
      return null
    }
    return error
  })
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

const deleteRecord = async (id) => {
  const response = await axios.delete(`/api/record/${id}`, {
    headers: { Authorization: `bearer ${localStorage.getItem('library-user-token')}` }
  })
  return response.data
}

const editRecord = async ({ entryTime, departureTime, id }) => {
  const updatedRecord = {
    entryTime,
    departureTime
  }
  const response = await axios.put(`/api/record/${id}`, updatedRecord, {
    headers: { Authorization: `bearer ${localStorage.getItem('library-user-token')}` }
  })
  return response.data
}

export default { getAll, createNewRecord, deleteRecord, editRecord }
