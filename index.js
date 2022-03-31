const fs = require('fs')
const express = require('express')
const app = express()

const log = 'public/log.json'
const link = 'https://agarripoff-1.mastersun81.repl.co/score'

const logger = fs.createWriteStream(log, {
  flags: 'a'
})
const writeLine = (line) => logger.write(`\n${line}`)

app.use(express.static('public'))

app.get('/score', (req, res) => {
  let temp = fs.readFileSync(log).toString()
  res.send(temp)
})

app.listen(8080)