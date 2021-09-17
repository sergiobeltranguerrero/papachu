import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import recordReducer from './reducers/recordReducer'
import loginReducer from './reducers/loginReducer'
import recordByMonth from './reducers/recordByMonthReducer'

const reducer = combineReducers({
  record: recordReducer,
  auth: loginReducer,
  months: recordByMonth
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
