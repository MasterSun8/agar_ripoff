const fs = require('fs')
const express = require('express')
const app = express()

const log = 'public/log.json'
const link = 'https://agarripoff-1.mastersun81.repl.co/score'

function replaceByValue(json, name, newvalue ) {
  let found = false
  json.forEach(x => {
    if(x.name == name){
      x.score = newvalue
      found = true
    }
  })
  if(!found){
    obj.push({name: name, score:newvalue})
  }
  return JSON.stringify(obj)
}

app.use(express.static('public'))

app.get('/score', (req, res) => {
  try{
  if(req.query.name){
    fs.readFile(log, 'utf8', function readFileCallback(err, data){
    if (err){
      console.log(err)
    } else {
      obj = JSON.parse(data)
      json = replaceByValue(obj, req.query.name, req.query.score)//JSON.stringify(obj)
      fs.writeFileSync(log, json)
    }
    })
  }
  }catch(e){
    console.log(e)
  }
    
  let temp = fs.readFileSync(log).toString()
  res.send(temp)
})

app.listen(8080)