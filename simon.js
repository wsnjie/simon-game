const buttonNames = ["green", "blue", "red", "yellow"]
const buttonSounds = ["assets/sounds/button-0.mp3", "assets/sounds/button-1.mp3", "assets/sounds/button-2.mp3", "assets/sounds/button-3.mp3"]

let levelCheck = 0

class Button {
    constructor(id, color) {
        this.id = id
        this.color = color
        this.sound = 0
    }

    lightUp() {
        $(`.simon-${this.id}`).fadeOut(50).fadeIn(50)
        this.sound.play()
    }
    flicker() {
        $(`.simon-${this.id}`).fadeOut(15).fadeIn(15)
    }
    moveCheck() {
        this.sound.play()
        this.flicker()
        game.turnOffListeners()
        if ((levelCheck + 1) === game.moves.length) {
            console.log("Last turn of level")
            levelCheck = 0
            if (this.id === game.moves[game.level]) {
                game.nextLevel()
            } else {
                console.log(alert("Better Luck Next Time..."))
            }
        } else {
            if (this.id === game.moves[levelCheck]) {
                console.log("Nice work")
                levelCheck++
                game.waitPlayerMoves()
            } else {
                console.log(alert("Too bad"))
            }
        }
    }
}

const game = {
    level: 0,
    highScore: 0,
    buttons: [],
    moves: [],
    currentMove: 0,
    lightTimout: 0,
    makeButtons: function (nameArray, soundArray) {
        let workingButton = 0
        for (let i = 0; i < 4; i++) {
            workingButton = new Button(i, nameArray[i])
            workingButton.sound = new Audio(soundArray[i])
            this.buttons.push(workingButton)
            $(`.simon-${i}`).on('click', () => this.buttons[i].lightUp())
        }
    },
    startGame: function () {
        $(".button-1").off()
        this.chooseMove()
        this.playMoves()
        this.waitPlayerMoves()

    },
    chooseMove: function () {
        this.currentMove = Math.round((Math.random() * -3) + 3)
        this.moves.push(this.currentMove)


    },
    playMoves: function () {
        setTimeout(() => this.cpuLight(true), 500)
        for (i = 0; i < this.moves.length; i++) {
            const loopMove = this.moves[i]
            const loopButton = this.buttons[loopMove]
            //This second loop multiplies the delay so the buttons playback with a delay inbetween, this is fix for all the buttons
            //playing at once. Concept detailed here: http://adripofjavascript.com/blog/drips/an-introduction-to-iffes-immediately-invoked-function-expressions.html
            const playLoop = function (i) {
                setTimeout(function () { setTimeout(() => loopButton.lightUp(), 1000 * i) }, 2500)
            }
            playLoop(i)
            this.lightTimout = (((i) * 1000) + 3000)
        }
        setTimeout(() => this.cpuLight(false), this.lightTimout)
    },
    waitPlayerMoves: function () {
        for (let i = 0; i < 4; i++) {
            $(`.simon-${i}`).on('click', () => this.buttons[i].moveCheck())
        }

    },
    nextLevel: function () {
        console.log("Great Job!")
        this.level++
        if (this.level === 10) {
            this.youWin()
        } else {
            $("#level").html((this.level + 1))
            this.chooseMove()
            this.playMoves()
            this.waitPlayerMoves()
        }
    },
    turnOffListeners: function () {
        for (let i = 0; i < 4; i++) {
            $(`.simon-${i}`).off()
        }
    },
    youWin: function () {
        console.log(alert("You Win!"))
    },
    reset: function () {
        this.moves = []
        this.buttons = []
        this.makeButtons(buttonNames, buttonSounds)
        this.level = 0
        $("#level").html((this.level + 1))
        levelCheck = 0
        this.currentMove = 0
        $(".button-1").on('click', () => this.startGame())
        console.log("reset")
    },
    cpuLight: function (check) {
        if (check === true) {
            $("#cpu").css("background-color", "lightcoral")
            console.log("light on")
        } else if (check === false) {
            $("#cpu").css("background-color", "grey")
            console.log("light off")
        }
    }



}
game.makeButtons(buttonNames, buttonSounds)
$(".button-1").on('click', () => game.startGame(game.cpuLight))
$(".button-7").on('click', () => game.reset())