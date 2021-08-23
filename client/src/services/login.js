import axios from 'axios'

const login = async ({ username, password }) => {
  const response = await axios.post('/api/login', { username, password })

  if (response.data.token) {
    localStorage.setItem('library-user-token', response.data.token)
  }
  return response.data
}

const logout = () => {
  localStorage.removeItem('library-user-token')
}

export default { login, logout }
