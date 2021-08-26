const { Schema, model } = require('mongoose')
const Record = require('./Record')

const RecordByMonthSchema = new Schema({
  month: String,
  numberMonth: Number,
  year: Number,
  totalHours: Number,
  salary: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  records: [{
    type: Schema.Types.ObjectId,
    ref: 'Record'
  }]
})

RecordByMonthSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

RecordByMonthSchema.pre('save', async function () {
  let accumulator = 0
  for (let i = 0; i < this.records.length; i++) {
    const record = await Record.findById(this.records[i])
    accumulator += record.totalHours
  }
  this.totalHours = accumulator
})

RecordByMonthSchema.pre('findOneAndRemove', async function () {
  let accumulator = 0
  console.log(this)
  for (let i = 0; i < this.records.length; i++) {
    const record = await Record.findById(this.records[i])
    accumulator += record.totalHours
  }
  this.totalHours = accumulator
})
const RecordByMonth = model('RecordByMonth', RecordByMonthSchema)
module.exports = RecordByMonth
