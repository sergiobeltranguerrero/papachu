import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth)
  return (
    <Route {...rest} render={
      props => {
        if (auth.isLoggedIn) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to='/login'/>
        }
      }
    } />
  )
}

export default ProtectedRoute
