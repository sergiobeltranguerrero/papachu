import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import logo from '../img/logo.png'
import { LinkContainer } from 'react-router-bootstrap'

const NavBar = () => {
  return (
    <Navbar bg="light" variant="secondary" expand="lg">
      <Container>
        <Navbar.Brand><Link to="/">
          <img
          src={logo}
          width="60"
          height="60"
        />
        </Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <LinkContainer to='/'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/create_record'>
            <Nav.Link>Crear un Registro</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/records'>
            <Nav.Link>Registros</Nav.Link>
          </LinkContainer>
          <Nav.Link>Listado por meses</Nav.Link>
          <LinkContainer to='/logout'>
            <Nav.Link><Button variant='danger'>Cerrar Sesión</Button></Nav.Link>
          </LinkContainer>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavBar
