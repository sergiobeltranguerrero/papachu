import React from 'react'
import { createRecord } from '../reducers/recordReducer'
import { useDispatch } from 'react-redux'
import Navbar from './Navbar'

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
      <Navbar/>
      <h2>Crear un nuevo Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Día: </label>
          <input type="date" name="date"/>
        </div>
        <div>
          <label>Hora de entrada: </label>
          <input type="time" name="entryTime"/>
        </div>
        <div>
          <label>Hora de salida: </label>
          <input type="time" name="departureTime"/>
        </div>
        <button>guardar</button>
      </form>
    </div>
  )
}

export default RecordForm
