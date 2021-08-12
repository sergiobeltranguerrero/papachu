require('dotenv').config({ path: './utils/.env' })
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')

const recordRouter = require('./controllers/record')

const requestLogger = require('./utils/requestLogger')
const notFound = require('./utils/notFound')

app.use(express.json())
app.use(requestLogger)
app.use(cors())

app.use('/api/record', recordRouter)

app.use(notFound)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = { app }
