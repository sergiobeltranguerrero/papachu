import recordByMonthService from '../services/recordByMonth'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_MONTHS':
      return action.data
    default:
      return state
  }
}

export const initialzeMonths = (year) => {
  return async dispatch => {
    const months = await recordByMonthService.getAll(year)
    console.log(months)
    dispatch({
      type: 'INIT_MONTHS',
      data: months
    })
  }
}
export default reducer
