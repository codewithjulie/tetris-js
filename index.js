const canvas = document.querySelector('#gameboard');
const ctx = canvas.getContext('2d');

const canvasWidth = 300;
const canvasHeight = 600;
const squareSize = canvasWidth / 10;
const canvasStartX = 3;
const canvasStartY = 0;
const heightInBlocks = 20;
const widthInBlocks = 10;
let speed = 500;

const gameBoard = Array(20);
for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i] = Array(10).fill(0);
}

gameBoard[10][4] = 1;
console.log(gameBoard);

ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

ctx.fillStyle = 'blue';
ctx.strokeStyle = 'white';

const oShape = {
    color: 'yellow',
    shape: [
        [1, 1],
        [1, 1],
    ],
};
const jShape = [
    [0, 0, 0],
    [2, 0, 0],
    [1, 1, 1],
];
const lShape = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
];
const sShape = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
];
const zShape = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
];
const tShape = [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
];
const iShape = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
];

const arr = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
];

class Tetromino {
    constructor(shape) {
        this.x = canvasStartX;
        this.y = canvasStartY;
        this.dx = 0;
        this.shape = shape;
        this.dy = 1;
        this.stopAnimation = false;
        this.bottomY = this.y + this.shape.length;
    }
    draw() {
        // loop through the shape array and color where there is a 1
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[0].length; col++) {
                if (this.shape[row][col]) {
                    if (this.stopAnimation) {
                        gameBoard[row + this.y][col + this.x] = 1;
                    } else {
                        gameBoard[row + this.y][col + this.x] = 2;
                    }
                }
            }
        }
    }

    delete() {
        ctx.clearRect(
            this.x * squareSize - 1,
            this.y * squareSize - 1,
            this.shape.length * squareSize + 2,
            this.shape.length * squareSize + 2
        );
    }

    update() {
        // If tetromino is at the bottom
        if (this.bottomY >= heightInBlocks || this.isColliding()) {
            this.dy = 0;
            this.stopAnimation = true;
        }

        document.addEventListener('keydown', e => {
            console.log(e.key);
            if (e.key === 'ArrowLeft') {
                this.dx = -1;
                if (this.x <= 0) this.dx = 0;
            }
            if (e.key === 'ArrowRight') {
                this.dx = 1;
                if (this.x + this.shape.length >= widthInBlocks) this.dx = 0;
            }
        });

        // Remove the current state of tetromino from the game state
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[0].length; col++) {
                if (this.shape[row][col]) {
                    gameBoard[row + this.y][col + this.x] = 0;
                }
            }
        }

        // Update y
        this.y += this.dy;
        this.x += this.dx;
        this.dx = 0;

        // Update the bottom of the tetromino
        this.bottomY += this.dy;
    }

    isColliding() {
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[0].length; col++) {
                if (
                    gameBoard[row + this.y][col + this.x] === 2 &&
                    gameBoard[row + this.y + 1][col + this.x] === 1
                ) {
                    return true;
                }
            }
        }
        return false;
    }
}
let tetromino = new Tetromino(tShape);

const makeTetrominoFall = () => {
    tetromino.delete();
    tetromino.update();
    tetromino.draw();
    updategameBoard();
};

setInterval(() => {
    if (!tetromino.stopAnimation) {
        makeTetrominoFall();
    }
}, speed);

let h = gameBoard.length;
let w = gameBoard[0].length;

const updategameBoard = () => {
    for (let row = 0; row < h; row++) {
        for (let col = 0; col < w; col++) {
            if (gameBoard[row][col]) {
                ctx.fillRect(
                    col * squareSize,
                    row * squareSize,
                    squareSize,
                    squareSize
                );
                ctx.strokeRect(
                    col * squareSize,
                    row * squareSize,
                    squareSize,
                    squareSize
                );
            }
        }
    }
};
