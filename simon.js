console.log("linked up!")
const buttonNames = ["green", "blue", "red", "yellow"]
const buttonSounds = ["assets/sounds/button-0.mp3", "assets/sounds/button-1.mp3", "assets/sounds/button-2.mp3", "assets/sounds/button-3.mp3"]
let userMove = 0
let clickCheck = false

class Button {
    constructor(id, color) {
        this.id = id
        this.color = color
        this.sound = 0
    }

    lightUp() {
        $(`.simon-${this.id}`).fadeOut(50).fadeIn(50)
        this.sound.play()
        console.log(this.color + "flashed")
    }
    moveCheck() {
        this.lightUp()
        userMove = this.id
        clickCheck = true
        console.log("clicked")
        if (userMove = game.level) {
            game.rightAnswer()
        } else {
            console.log("Try again")
        }
    }
}

const game = {
    level: 0,
    highScore: 0,
    buttons: [],
    moves: [],
    currentMove: 0,
    rightMove: 0,
    makeButtons: function (nameArray, soundArray) {
        let workingButton = 0
        for (let i = 0; i < 4; i++) {
            workingButton = new Button(i, nameArray[i])
            workingButton.sound = new Audio(soundArray[i])
            this.buttons.push(workingButton)
            $(`.simon-${i}`).on('click', () => this.buttons[i].lightUp())
        }
    },
    startGame: function (callback) {
        this.chooseMove()
        this.playMoves()
        this.waitPlayerMoves()
    },
    chooseMove: function () {
        const randomNum = Math.round((Math.random() * -3) + 3)
        currentMove = randomNum
        console.log("Chosen Move: " + currentMove)
        this.moves.push(currentMove)
        this.level++
    },
    playMoves: function () {
        setTimeout(function () { }, 2500)
        for (i = 0; i < this.moves.length; i++) {
            const loopMove = this.moves[i]
            const loopButton = this.buttons[loopMove]
            //This second loop multiplies the delay so the buttons playback with a delay inbetween, this is fix for all the buttons
            //playing at once. Concept detailed here: http://adripofjavascript.com/blog/drips/an-introduction-to-iffes-immediately-invoked-function-expressions.html
            const playLoop = function (i) {
                setTimeout(() => loopButton.lightUp(), 2000 * i)
            }
            playLoop(i)
        }
    },

    waitPlayerMoves: function () {
        for (let i = 0; i < 4; i++) {
            $(`.simon-${i}`).on('click', () => this.buttons[i].moveCheck())
        }

    },

    rightAnswer: function () {
        console.log("Great Job!")
        this.chooseMove()
        this.playMoves()
        this.waitPlayerMoves()
    },
    turnOnListeners: function () {
        for (let i = 0; i < 4; i++) {
            $(`.simon-${i}`).on('click', () => this.buttons[i].lightUp())
        }
    },
    turnOffListeners() {
        for (let i = 0; i < 4; i++) {
            $(`.simon-${i}`).off()
        }
    }

}
game.makeButtons(buttonNames, buttonSounds)
$(".button-1").on('click', () => game.startGame())