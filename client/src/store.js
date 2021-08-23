import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import recordReducer from './reducers/recordReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  record: recordReducer,
  auth: loginReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
