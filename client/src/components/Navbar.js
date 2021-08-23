import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home </Link>
      <Link to="/create_record">Crear un Registro </Link>
      <Link to="records">Registros </Link>
      <Link to="/logout">Logout </Link>
    </div>
  )
}
export default Navbar
