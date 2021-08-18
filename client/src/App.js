import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { initializeRecord } from './reducers/recordReducer'
import RecordList from './components/RecordList'
import RecordForm from './components/RecordForm'

function App () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeRecord())
  }, [dispatch])

  return (
    <div>
      <RecordList/>
      <RecordForm/>
    </div>
  )
}

export default App
