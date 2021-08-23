import loginService from '../services/login'

const user = localStorage.getItem('library-user-token')
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      }
    case 'LOGIN_FAIL':
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    default:
      return state
  }
}

export const logout = () => (dispatch) => {
  loginService.logout()
  dispatch({
    type: 'LOGOUT'
  })
}

export const login = (content) => (dispatch) => {
  return loginService.login(content).then(
    (data) => {
      dispatch({
        type: 'LOGIN_SUCCESS',
        data
      })
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      dispatch({
        type: 'LOGIN_FAIL'
      })
      dispatch({
        type: 'SET_MESSAGE',
        message
      })
    }
  )
}

export default reducer
