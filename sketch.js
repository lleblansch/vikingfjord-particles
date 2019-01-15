let offset = 5
var maxDist = 300
let particleCount;
let particles = []


function setup() {
    mX = mouseX
    mY = mouseY
    createCanvas(windowWidth - offset, windowHeight - offset, P2D)
    particleCount = Math.round((width * height - offset^2)/13000)
    console.log(`${particleCount}`)
    for (let i = 0; i < particleCount; i++) {
        particles[i] = new Particle(random(0, width - offset), random(0, height - offset), random(-3, 3)/10, random(-3, 3)/10)
    }
}

function draw() {
    /* if(mX != mouseX || mY != mouseY){
        tempPart = new Particle(mouseX, mouseY, random(-3, 3)/10, random(-3, 3)/10)
        particles.push(tempPart)
        particleCount++
    }
    mX = mouseX
    mY = mouseY */
    background(25)
    for (let i = 0; i < particleCount; i++) {
        particles[i].move()
        particles[i].draw()
        particles[i].recycle(random(0, width - offset), random(0, height - offset), random(-3, 3)/10, random(-3, 3)/10)
        //particles[i].destroy(i)
        particles[i].line()
    }
}

class Particle {
    constructor(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    move() {
        this.x = this.x + this.vx
        this.y = this.y + this.vy
    }
    draw() {
        fill(255)
        noStroke()
        ellipse(this.x, this.y, 3, 3)
    }
    recycle(x, y, vx, vy) {
        if (this.x >= width - offset || this.y >= height - offset || this.x <= 0 || this.y <= 0) {
            this.x = x
            this.y = y
            this.vx = vx
            this.vy = vy
        }
    }
    line(){
        if(dist(this.x, this.y, mouseX, mouseY) <= maxDist){
            stroke(255, 255, 255, map(dist(this.x, this.y, mouseX, mouseY), 0, maxDist, 255, 0) )
            strokeWeight(2)
            line(this.x, this.y, mouseX, mouseY)
        }
    }
    destroy(i){
        if (this.x >= width - offset || this.y >= height - offset || this.x <= 0 || this.y <= 0) {
            particles.splice(i, 1)
            particleCount--
        }
    }
}