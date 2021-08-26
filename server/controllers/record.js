const recordRouter = require('express').Router()
const Record = require('../models/Record')
const User = require('../models/User')
const RecordByMonth = require('../models/RecordByMonth')
const isValidToken = require('../utils/helpers')
const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const isValidHour = (input) => {
  return /([01]?[0-9]|2[0-3]):[0-5][0-9]?$/.test(input)
}

const getTotalHours = (entryTime, departureTime) => {
  const entryUnit = Number(entryTime.split(':')[0])
  const entryTens = Number(entryTime.split(':')[1]) * (1 / 60)
  const departureUnit = Number(departureTime.split(':')[0])
  const departureTens = Number(departureTime.split(':')[1]) * (1 / 60)

  if (entryUnit > departureUnit) {
    return (((24 + departureUnit) - entryUnit) + (departureTens - entryTens))
  } else {
    return ((departureUnit - entryUnit) + (departureTens - entryTens))
  }
}

recordRouter.get('/', async (req, res, next) => {
  try {
    const decodedToken = isValidToken(req, res)
    if (!decodedToken.id) return

    const user = await User.findById(decodedToken.id)
    const records = await Record.find({ user })
      .populate('user', 'username')
    res.status(200).json(records)
  } catch (e) {
    next(e)
  }
})

recordRouter.post('/', async (req, res, next) => {
  try {
    const { entryTime, departureTime, date } = req.body

    const decodedToken = isValidToken(req, res)
    if (!decodedToken.id) return
    const user = await User.findById(decodedToken.id)

    const date2 = new Date(date)
    const month = date2.getMonth() + 1
    const year = date2.getFullYear()
    let recordByMonth = await RecordByMonth.findOne({ user, numberMonth: month, year })
    if (!recordByMonth) {
      await new RecordByMonth({
        month: monthNames[month - 1],
        numberMonth: month,
        year,
        user
      }).save()
      recordByMonth = await RecordByMonth.findOne({ user, numberMonth: month, year })
    }

    if (!entryTime || !departureTime || !date) {
      return res
        .status(400)
        .json({
          error: 'entry time or departure time or date is missing'
        })
        .end()
    }
    if (!isValidHour(entryTime) || !isValidHour(departureTime)) {
      return res
        .status(400)
        .json({
          error: 'entry time or departure time does not have the correct format'
        })
        .end()
    }
    const record = new Record({
      entryTime,
      departureTime,
      totalHours: getTotalHours(entryTime, departureTime),
      date,
      user: user._id
    })
    const savedRecord = await record.save()

    recordByMonth.records = recordByMonth.records.concat(savedRecord._id)
    await recordByMonth.save()

    res.json(savedRecord)
  } catch (e) {
    next(e)
  }
})

recordRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = isValidToken(request, response)
  if (!decodedToken.id) return

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
  const decodedToken = isValidToken(request, response)
  if (!decodedToken.id) return

  const user = await User.findById(decodedToken.id)
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

  if (!isValidHour(entryTime) || !isValidHour(departureTime)) {
    return response
      .status(400)
      .json({
        error: 'entry time or departure time does not have the correct format'
      })
      .end()
  }
  const updatedRecord = {
    entryTime,
    departureTime,
    totalHours: getTotalHours(entryTime, departureTime),
    date,
    user: user._id
  }
  try {
    Record.findByIdAndUpdate(id, updatedRecord, { new: true })
      .then(result => response.json(result))
  } catch (e) {
    next(e)
  }
})

module.exports = recordRouter
