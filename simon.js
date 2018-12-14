console.log("linked up!")
const buttonNames = ["green", "blue", "red", "yellow"]

class Button {
    constructor(id, color) {
        this.id = id
        this.color = color
        this.sound = null
    }

    lightUp() {
        $(`.simon-${this.id}`).fadeOut(100).fadeIn(100)
        console.log(this.color + "flashed")
    }
}

const game = {
    level: 0,
    highScore: 0,
    buttons: [],
    moves: [],
    rightMove: null,
    makeButtons: function (array) {
        let workingButton = null
        for (let i = 0; i < 4; i++) {
            workingButton = new Button(i, array[i])
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

    }

}
game.makeButtons(buttonNames)

// const makeButtons = function (array) {
//     let workingButton = null
//     for (let i = 0; i < 4; i++) {
//         workingButton = new Button(i, array[i])
//         console.log(workingButton)
//         game.buttons.push(workingButton)
//     }

// }

// makeButtons(buttonNames)
// game.buttons = [greenButton, blueButton, redButton, yellowButton]

// $('.simon-0').on('click', () => greenButton.lightUp())