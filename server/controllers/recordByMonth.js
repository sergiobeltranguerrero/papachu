const recordByMonthRouter = require('express').Router()
const RecordByMonth = require('../models/RecordByMonth')
const User = require('../models/User')
const isValidToken = require('../utils/helpers')

const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

recordByMonthRouter.get('/:year/:month', async (req, res, next) => {
  try {
    const decodedToken = isValidToken(req, res)
    if (!decodedToken) return

    const year = req.params.year
    const month = req.params.month
    const user = await User.findById(decodedToken.id)
    const records = await RecordByMonth.findOne({ user, year, numberMonth: month })
      .populate('user', { username: 1, name: 1 })
      .populate('records', { entryTime: 1, departureTime: 1, totalHours: 1, date: 1 })

    if (!records) {
      res.status(404).json({ error: 'Not Found' })
    } else {
      res.status(200).json(records)
    }
  } catch (e) {
    next(e)
  }
})

recordByMonthRouter.get('/:year', async (req, res, next) => {
  try {
    const decodedToken = isValidToken(req, res)
    if (!decodedToken.id) return
    const year = req.params.year
    const user = await User.findById(decodedToken.id)
    const registers = await RecordByMonth.find({ user, year })
    res.status(200).json(registers)
  } catch (e) {
    next(e)
  }
})

recordByMonthRouter.post('/:year/:month', async (req, res, next) => {
  try {
    const year = req.params.year
    const month = req.params.month
    const { totalHours, salary } = req.body

    const decodedToken = isValidToken(req, res)
    if (!decodedToken.id) return
    const user = await User.findById(decodedToken.id)

    const recordByMonth = new RecordByMonth({
      month: monthNames[month - 1],
      numberMonth: month,
      year,
      totalHours,
      salary,
      user
    })

    const savedRecordByMonth = await recordByMonth.save()
    res.json(savedRecordByMonth)
  } catch (e) {
    next(e)
  }
})

recordByMonthRouter.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const { totalHours, salary } = req.body

    const decodedToken = isValidToken(req, res)
    if (!decodedToken.id) return

    const recordByMonth = {
      totalHours,
      salary
    }

    RecordByMonth.findByIdAndUpdate(id, recordByMonth, { new: true })
      .then(result => res.json(result))
  } catch (e) {
    next(e)
  }
})

module.exports = recordByMonthRouter
