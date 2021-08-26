import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { initializeRecord } from './reducers/recordReducer'
import RecordList from './components/RecordList'
import RecordForm from './components/RecordForm'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { logout } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeRecord())
  }, [dispatch])

  const Logout = () => {
    dispatch(logout())
    return <Redirect to="/login"/>
  }

  return (
    <div className='container'>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginForm}/>
          <Route path="/logout" component={Logout}/>
          <ProtectedRoute path="/records" component={RecordList}/>
          <ProtectedRoute path="/create_record" component={RecordForm}/>
          <ProtectedRoute path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
