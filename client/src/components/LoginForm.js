import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Redirect } from 'react-router-dom'
import { initializeRecord } from '../reducers/recordReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { isLoggedIn } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const onChangeUsername = (event) => {
    const username = event.target.value
    setUsername(username)
  }

  const onChangePassword = (event) => {
    const password = event.target.value
    setPassword(password)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ username, password }))
  }
  if (isLoggedIn) {
    dispatch(initializeRecord())
    return <Redirect to='/'/>
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type='text' value={username} onChange={onChangeUsername}/>
      </div>
      <div>
        <label>Password</label>
        <input type='password' value={password} onChange={onChangePassword}/>
      </div>
      <button>login</button>
    </form>
  )
}

export default LoginForm
