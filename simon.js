console.log("linked up!")
const buttonNames = ["green", "blue", "red", "yellow"]
const buttonSounds = ["assets/sounds/button-0.mp3", "assets/sounds/button-1.mp3", "assets/sounds/button-2.mp3", "assets/sounds/button-3.mp3"]


class Button {
    constructor(id, color) {
        this.id = id
        this.color = color
        this.sound = null
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
    rightMove: null,
    makeButtons: function (nameArray, soundArray) {
        let workingButton = null
        for (let i = 0; i < 4; i++) {
            workingButton = new Button(i, nameArray[i])
            workingButton.sound = new Audio(soundArray[i])
            this.buttons.push(workingButton)
            $(`.simon-${i}`).on('click', () => this.buttons[i].lightUp())
            console.log(`Button ${i}, Color: ${this.buttons[i].color} is added`)
        }
    },
    startGame: function () {

    },
    chooseButton: function () {

    },
    addToMoves: function () {

    },
    playMoves: function () {

    },
    getPlayerMoves: function () {

    },
    turnOnListeners: function () {
        for (let i = 0; i < 4; i++) {
            $(`.simon-${i}`).on('click', () => this.buttons[i].lightUp())
        }
    },
    turnOffListeners() {

    }

}
game.makeButtons(buttonNames, buttonSounds)
