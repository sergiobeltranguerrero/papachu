import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'

const RecordList = () => {
  const records = useSelector(state => state.record)
  const auth = useSelector(state => state.auth)

  if (records && auth.isLoggedIn === true) {
    return (
    <div>
      <Navbar/>
      <h2>Registros</h2>
      <table>
        <tr>
          <td>Día</td>
          <td>Hora de entrada</td>
          <td>Hora de salida</td>
          <td><strong>Total</strong></td>
        </tr>
        {records.map(record =>
        <tr key={record.id}>
          <td>{record.date}</td>
          <td>{record.entryTime}</td>
          <td>{record.departureTime}</td>
          <td><strong>{record.totalHours}</strong></td>
        </tr>
        )}
        <tr>
          <td/>
          <td/>
          <td/>
          <td>
            <strong>
              {records.reduce((acc, record) => acc + record.totalHours, 0)}
            </strong>
          </td>
        </tr>
      </table>
    </div>
    )
  }
  return null
}

export default RecordList
