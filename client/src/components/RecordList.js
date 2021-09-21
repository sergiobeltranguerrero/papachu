import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NavBar from './NavBar'
import { Button, Table } from 'react-bootstrap'
import { deleteRecord } from '../reducers/recordReducer'
import { LinkContainer } from 'react-router-bootstrap'

const RecordList = () => {
  const records = useSelector(state => state.record)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteRecord(id))
  }

  if (records && auth.isLoggedIn === true) {
    return (
      <div>
        <NavBar/>
        <div className="p-4">
          <h1>Registros</h1>
        </div>
        <Table striped bordered hover>
          <thead>
          <tr>
            <td><strong>Día</strong></td>
            <td><strong>Hora de entrada</strong></td>
            <td><strong>Hora de salida</strong></td>
            <td><strong>Total</strong></td>
            <td/>
          </tr>
          </thead>
          <tbody>
          {records.map(record =>
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.entryTime}</td>
              <td>{record.departureTime}</td>
              <td><strong>{record.totalHours}</strong></td>
              <td className="text-center">
                <LinkContainer to={`/edit/${record.id}`}>
                  <Button variant="warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-pencil" viewBox="0 0 16 16">
                      <path
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                  </Button>
                </LinkContainer>
                {' '}
                <Button variant="danger" onClick={() => handleDelete(record.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       className="bi bi-trash" viewBox="0 0 16 16">
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </Button>
              </td>
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
          </tbody>
        </Table>
      </div>
    )
  }
  return null
}

export default RecordList
