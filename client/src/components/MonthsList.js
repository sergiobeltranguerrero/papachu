import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from './NavBar'
import { Table } from 'react-bootstrap'

const MonthsList = () => {
  const months = useSelector(state => state.months)
  const auth = useSelector(state => state.auth)

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
            <td/>
          </tr>
          </thead>
          <tbody>
          {months.map(month =>
            <tr key={month.id}>
              <td>{month.month}</td>
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
