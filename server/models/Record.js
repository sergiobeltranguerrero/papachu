const { Schema, model } = require('mongoose')

const recordSchema = new Schema({
  entryTime: String,
  departureTime: String,
  totalHours: Number,
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

recordSchema.pre('findOneAndDelete', async function () {
  console.log(await this)
})

recordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.date = returnedObject.date.toLocaleDateString('en-GB')
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Record = model('Record', recordSchema)
module.exports = Record
