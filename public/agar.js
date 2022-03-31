const canvas = document.createElement("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
body = document.getElementsByTagName("body")[0]
body.appendChild(canvas)
const context = canvas.getContext('2d')
const randomColor = size => [...Array(size)].map(() => randomInt(16).toString(16)).join('')
const fps = 60
const Canvasx = canvas.width
const Canvasy = canvas.height
const url = 'https://agarripoff-1.mastersun81.repl.co/score'
const name = prompt(`What's your name?`)

var highestScore = 0
var scale = 1
var text = ''
var mousex = Canvasx / 2
var mousey = Canvasy / 2

body.addEventListener("mousemove", function(event) {
  myFunction(event)
})

function myFunction(e) {
  mousex = e.clientX
  mousey = e.clientY
}

async function createLeaderboard(){
  try {
    let response = await fetch(url)
    text = await response.json()
    let temp = 0
    text.forEach(obj => {
      if(temp < obj.score) temp = obj.score
    })
    highestScore = temp
  } catch (e) {
    console.log(e)
  }
  
}

async function submit(name, score){
  try {
    let tempUrl = url + '?name=' + name + '&score=' + score
    let response = await fetch(tempUrl)
  } catch (e) {
    console.log(e)
  }
  
}

function randomInt(max) {
  let temp = Math.floor(Math.random() * max)
  if (Math.round(Math.random())) {
    temp *= -1
  } else {
    temp *= 1
  }
  return temp
}

arrayOfFood = []

class Blob {
  constructor() {
    this.color = '#' + randomColor(6)
    this.mass = 16
    this.r = this.mass * scale
    this.x = randomInt(Canvasx * 20)
    this.y = randomInt(Canvasy * 20)
    this.velocityx = 0
    this.velocityy = 0
  }

  movement() {
    let distancex = mousex - hero.x
    let distancey = mousey - hero.y
    this.x += distancex / -50
    this.y += distancey / -50
  }

  scaleSize() {
    this.r = this.mass * scale
  }

  x(v) { this.x = v }
  y(v) { this.y = v }

  drawBlob() {
    context.fillStyle = this.color
    context.beginPath()
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    context.fill()
  }
}

class mainBlob extends Blob {
  constructor() {
    super()
    this.mass *= 2
    this.x = Canvasx / 2
    this.y = Canvasy / 2
  }

  collidesWithFood() {
    arrayOfFood.forEach(food => {
      let pita = (this.x - food.x) * (this.x - food.x) + (this.y - food.y) * (this.y - food.y)
      pita = Math.sqrt(pita)
      let radSum = this.r + food.r / 2
      if (pita <= radSum) {
        food.x = randomInt(Canvasx)
        food.y = randomInt(Canvasy)
        this.increaseSize()
      }
    })
  }

  score() {
    context.font = "30px Arial"
    context.fillStyle = "black"
    context.fillText(('Highest Score: ' + highestScore), Canvasx-300, 50)
    context.fillText(('Your Mass: ' + this.mass), 10, 50)
  }

  increaseSize() {
    this.mass += 1
    scale = (scale / 100) * 99
    createLeaderboard()
    submit(name, this.mass)
  }
}

const hero = new mainBlob()
hero.scaleSize()

for (let x = 0; x < 10000; x++) {
  arrayOfFood.push(new Blob())
}

function main() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  arrayOfFood.forEach(x => {
    x.movement()
    x.scaleSize()
    x.drawBlob()
  })
  hero.drawBlob()
  hero.collidesWithFood(arrayOfFood)
  hero.score()
}

createLeaderboard()

setInterval(main, 1000 / fps)