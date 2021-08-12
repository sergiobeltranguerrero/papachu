const { Schema, model } = require('mongoose')

const recordSchema = new Schema({
  entryTime: Date,
  departureTime: Date,
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

recordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.entryTime = returnedObject.entryTime.toLocaleTimeString('en-GB')
    returnedObject.departureTime = returnedObject.departureTime.toLocaleTimeString('en-GB')
    returnedObject.date = returnedObject.date.toLocaleDateString('en-GB')
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Record = model('Record', recordSchema)
module.exports = Record
