import recordService from '../services/record'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_RECORD':
      return action.data
    case 'NEW_RECORD':
      return state.concat(action.data)
    default:
      return state
  }
}

export const initializeRecord = () => {
  return async dispatch => {
    const records = await recordService.getAll()
    dispatch({
      type: 'INIT_RECORD',
      data: records
    })
  }
}

export const createRecord = (content) => {
  return async dispatch => {
    const data = await recordService.createNewRecord(content)
    dispatch({
      type: 'NEW_RECORD',
      data
    })
  }
}

export default reducer
