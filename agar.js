const canvas = document.createElement("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
body = document.getElementsByTagName("body")[0]
body.appendChild(canvas)
const context = canvas.getContext('2d')
const randomInt     = max   => Math.floor(Math.random() * max)
const randomColor   = size  => [...Array(size)].map(() => randomInt(16).toString(16)).join('')
const fps = 60
const Canvasx = canvas.width
const Canvasy = canvas.height

var mousex = Canvasx/2
var mousey = Canvasy/2

body.addEventListener("mousemove", function(event) {
    myFunction(event)
})
  
function myFunction(e) {
    mousex = e.clientX
    mousey = e.clientY
}

arrayOfFood = []

class Blob{
    constructor(){
        this.color = '#' + randomColor(6)
        this.r = 16
        this.x = randomInt(Canvasx)
        this.y = randomInt(Canvasy)
        this.velocityx = 0
        this.velocityy = 0
    }

    x(v){this.x = v}
    y(v){this.y = v}

    drawBlob(){
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        context.fill()
    }
}

class mainBlob extends Blob{
    constructor(){
        super()
        this.r *= 2
        this.x = Canvasx/2
        this.y = Canvasy/2
    }

    movement(){
        let distancex = mousex - this.x
        let distancey = mousey - this.y
        this.x += distancex / 10
        this.y += distancey / 10
    }

    collidesWithFood(){
        arrayOfFood.forEach(food => {
        let pita = (this.x - food.x) * (this.x - food.x) + (this.y - food.y) * (this.y - food.y)
        pita = Math.sqrt(pita)
        let radSum = this.r// + food.r
        if(pita <= radSum){
            food.x = randomInt(Canvasx)
            food.y = randomInt(Canvasy)
            this.increaseSize()
        }
        })
    }

    increaseSize(){
        this.r += 1
    }
}

let hero = new mainBlob()

for(let x = 0; x < 10; x++){
    arrayOfFood.push(new Blob())
}

function main(){
    context.clearRect(0, 0, canvas.width, canvas.height)
    arrayOfFood.forEach(x => {
        x.drawBlob()
    })
    hero.drawBlob()
    hero.movement()
    hero.collidesWithFood(arrayOfFood)
}

setInterval(main, 1000/fps)