import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import recordReducer from './reducers/recordReducer'

const reducer = combineReducers({
  record: recordReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
