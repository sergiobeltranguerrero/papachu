import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Redirect } from 'react-router-dom'
import { initializeRecord } from '../reducers/recordReducer'
import { Button, Form } from 'react-bootstrap'
import '../css/login.css'

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
    return <Redirect to="/"/>
  }

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-md-6 login">
        <Form onSubmit={handleSubmit} className="login">
          <Form.Group className="mb-3" controlId="username">
            <Form.Control type="text" placeholder="Username" value={username} onChange={onChangeUsername}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
          </Form.Group>
          <Button type="submit">login</Button>
        </Form>
      </div>
    </div>

  )
}

export default LoginForm
