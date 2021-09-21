import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from './NavBar'
import { Table, Nav } from 'react-bootstrap'
import { initialzeMonths } from '../reducers/recordByMonthReducer'
import { LinkContainer } from 'react-router-bootstrap'

const MonthsList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialzeMonths(2021))
  }, [dispatch])

  const months = useSelector(state => state.months)
  const auth = useSelector(state => state.auth)
  console.log(months)

  if (months && auth.isLoggedIn === true) {
    return (
      <div>
        <NavBar/>
        <div className="p-4">
          <h1>Meses</h1>
        </div>
        <Table striped bordered hover>
          <thead>
          <tr>
            <td><strong>Mes</strong></td>
            <td><strong>Total Horas</strong></td>
            <td><strong>Salario</strong></td>
          </tr>
          </thead>
          <tbody>
          {months.map(month =>
            <tr key={month.id}>
              <td><LinkContainer to={`/2021/${month.month}`}>
                <Nav.Link>{month.month}</Nav.Link>
              </LinkContainer></td>
              <td>{month.totalHours}</td>
              <td>{month.salary}</td>
            </tr>)}
          </tbody>
        </Table>
      </div>
    )
  }
  return null
}

export default MonthsList
