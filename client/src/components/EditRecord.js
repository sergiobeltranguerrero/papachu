import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from './NavBar'
import { Button, Form } from 'react-bootstrap'
import { updatedRecord } from '../reducers/recordReducer'

const EditRecord = () => {
  const { id } = useParams()
  const records = useSelector(state => state.record)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()

  const record = records.find(record => record.id === id)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = {
      entryTime: event.target.entryTime.value,
      departureTime: event.target.departureTime.value,
      id
    }
    event.target.entryTime.value = ''
    event.target.departureTime.value = ''
    dispatch(updatedRecord(content))
    history.goBack()
  }

  if (record && auth.isLoggedIn === true) {
    return (
      <div>
        <NavBar/>
        <div className="p-4">
          <h1>Editar Registro</h1>
        </div>
        <div className="d-inline-flex p-1">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Día</Form.Label>
              <Form.Control type="text" value={record.date} disabled/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="entryTime">
              <Form.Label>Hora de entrada</Form.Label>
              <Form.Control type="time" defaultValue={record.entryTime}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="departureTime">
              <Form.Label>Hora de salida</Form.Label>
              <Form.Control type="time" defaultValue={record.departureTime}/>
            </Form.Group>
            <Button variant='primary' type='submit'>actualizar y volver</Button>
          </Form>
        </div>
      </div>
    )
  }
  return null
}
export default EditRecord
