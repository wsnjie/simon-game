console.log("linked up!")
const buttonNames = ["green", "blue", "red", "yellow"]
const buttonSounds = ["assets/sounds/button-0.mp3", "assets/sounds/button-1.mp3", "assets/sounds/button-2.mp3", "assets/sounds/button-3.mp3"]


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
}

const game = {
    level: 0,
    highScore: 0,
    buttons: [],
    moves: [],
    currentMove: 0,
    userMove: 0,
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
    startGame: function () {
        this.turnOffListeners()
        this.chooseMove()
        this.playMoves()

    },
    chooseMove: function () {
        const randomNum = Math.round((Math.random() * -3) + 3)
        currentMove = randomNum
        console.log("Chosen Move: " + currentMove)
        this.moves.push(currentMove)
    },
    addToMoves: function () {

    },
    playMoves: function () {
        for (i = 0; i < this.moves.length; i++) {
            const currentButton = this.moves[i]
            console.log(this.buttons[currentButton])
            const playLoop = function (i) {
                setTimeout(() => this.buttons[currentButton].lightUp(), 2000 * i)
            }
            playLoop(i)
        }
    },
    getPlayerMoves: function () {

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
const testArray = [0, 2, 1, 1, 3, 1, 0, 0, 1]
game.moves = testArray