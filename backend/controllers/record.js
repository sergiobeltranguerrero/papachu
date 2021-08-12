const recordRouter = require('express').Router()
const Record = require('../models/Record')

recordRouter.get('/', async (req, res, next) => {
  try {
    const records = await Record.find({})
    res.json(records)
  } catch (e) {
    next(e)
  }
})

recordRouter.post('/', async (req, res, next) => {
  const { entryTime, departureTime, date } = req.body
  if (!entryTime || !departureTime || !date) {
    return res
      .status(400)
      .json({
        error: 'entry time or departure time or date is missing'
      })
      .end()
  }
  const record = new Record({
    entryTime,
    departureTime,
    date
  })

  try {
    const savedRecord = await record.save()
    res.json(savedRecord)
  } catch (e) {
    next(e)
  }
})

recordRouter.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const res = await Record.findByIdAndDelete(id)
    if (res === null) {
      return response.status(404).end()
    }
    response.status(204).end()
  } catch (e) {
    next(e)
  }
})

recordRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const { entryTime, departureTime, date } = request.body
  if (!entryTime || !departureTime || !date) {
    return response
      .status(400)
      .json({
        error: 'entry time or departure time or date is missing'
      })
      .end()
  }
  const updatedRecord = {
    entryTime,
    departureTime,
    date
  }
  try {
    Record.findByIdAndUpdate(id, updatedRecord, { new: true })
      .then(result => response.json(result))
  } catch (e) {
    next(e)
  }
})

module.exports = recordRouter
