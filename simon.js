console.log("linked up!")

class Button {
    constructor(id, color) {
        this.id = id
        this.color = color
        this.sound = null
    }

    lightUp() {

    }
}

const game = {
    level: 0,
    highScore: 0,
    buttons: [],
    moves: [],
    rightMove: null,
    startGame: function () {

    },
    chooseButton: function () {

    },
    addToMoves: function () {

    },
    playMoves: function () {

    }

}

const greenButton = new Button(0, "green")
const blueButton = new Button(1, "blue")
const redButton = new Button(2, "red")
const yellowButton = new Button(3, "yellow")
game.buttons = [greenButton, blueButton, redButton, yellowButton]