import React from 'react'
import { createRecord } from '../reducers/recordReducer'
import { useDispatch } from 'react-redux'
import NavBar from './NavBar'
import { Form, Button } from 'react-bootstrap'

const RecordForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = {
      entryTime: event.target.entryTime.value,
      departureTime: event.target.departureTime.value,
      date: event.target.date.value
    }
    event.target.entryTime.value = ''
    event.target.departureTime.value = ''
    event.target.date.value = ''
    dispatch(createRecord(content))
  }

  return (
    <div>
      <NavBar/>
      <div className="p-4">
        <h1>Nuevo Registro</h1>
      </div>
      <div className="d-inline-flex p-1">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Día</Form.Label>
            <Form.Control type="date" placeholder="Día"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="entryTime">
            <Form.Label>Hora de entrada</Form.Label>
            <Form.Control type="time" placeholder="Hora de entrada"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="departureTime">
            <Form.Label>Hora de salida</Form.Label>
            <Form.Control type="time" placeholder="Hora de salida"/>
          </Form.Group>
          <Button variant='primary' type='submit'>guardar</Button>
        </Form>
      </div>
    </div>
  )
}

export default RecordForm
