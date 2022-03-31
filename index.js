const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/score', (req, res) => {
  res.send('helol')
})

app.listen(8080)