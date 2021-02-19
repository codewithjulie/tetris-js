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

//TODO: Figure out how to spawn tetromino above the canvas

console.log(gameBoard);

ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

// Set up the grid
ctx.strokeStyle = 'white';
// Draw the horizontal lines
for (let row = 0; row < heightInBlocks; row++) {
    ctx.beginPath();
    ctx.moveTo(0, row * squareSize);
    ctx.lineTo(canvasWidth, row * squareSize);
    ctx.stroke();
}

// Draw the vertical lines
for (let col = 0; col < widthInBlocks; col++) {
    ctx.beginPath();
    ctx.moveTo(col * squareSize, 0);
    ctx.lineTo(col * squareSize, canvasHeight);
    ctx.stroke();
}

const oShape = {
    matrix: [
        [1, 1],
        [1, 1],
    ],
    color: 'yellow',
};
const jShape = {
    matrix: [
        [0, 0, 0],
        [2, 0, 0],
        [1, 1, 1],
    ],
    color: 'blue',
};
const lShape = {
    matrix: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
    ],
    color: 'orange',
};
const sShape = {
    matrix: [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
    ],
    color: 'green',
};
const zShape = {
    matrix: [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ],
    color: 'red',
};
const tShape = {
    matrix: [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1],
    ],
    color: 'purple',
};
const iShape = {
    matrix: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ],
    color: 'cyan',
};

const arr = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
];

const shapes = [oShape, jShape, lShape, sShape, zShape, iShape, tShape];

class Tetromino {
    constructor(shape) {
        this.x = canvasStartX;
        this.y = canvasStartY;
        this.dx = 0;
        this.shape = shape;
        this.dy = 1;
        this.stopAnimation = false;
        // this.bottomY = this.y + this.shape.matrix.length;
    }
    draw() {
        ctx.fillStyle = this.shape.color;

        // loop through the shape array and color where there is a 1
        for (let row = 0; row < this.shape.matrix.length; row++) {
            for (let col = 0; col < this.shape.matrix[0].length; col++) {
                if (this.shape.matrix[row][col]) {
                    if (this.stopAnimation) {
                        gameBoard[row + this.y][col + this.x] = 1;
                    } else {
                        gameBoard[row + this.y][col + this.x] = 2;
                    }
                    ctx.fillRect(
                        (col + this.x) * squareSize,
                        (row + this.y) * squareSize,
                        squareSize,
                        squareSize
                    );
                    ctx.strokeRect(
                        (col + this.x) * squareSize,
                        (row + this.y) * squareSize,
                        squareSize,
                        squareSize
                    );
                }
            }
        }
    }

    delete() {
        ctx.fillStyle = 'rgb(43, 34, 34)';
        for (let row = 0; row < this.shape.matrix.length; row++) {
            for (let col = 0; col < this.shape.matrix[0].length; col++) {
                if (this.shape.matrix[row][col]) {
                    ctx.fillRect(
                        (col + this.x) * squareSize,
                        (row + this.y) * squareSize,
                        squareSize,
                        squareSize
                    );
                    ctx.strokeRect(
                        (col + this.x) * squareSize,
                        (row + this.y) * squareSize,
                        squareSize,
                        squareSize
                    );
                }
            }
        }
    }

    update() {
        // If tetromino is at the bottom
        if (this.isColliding()) {
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
                if (this.x + this.shape.matrix.length >= widthInBlocks)
                    this.dx = 0;
            }
        });

        // Remove the current state of tetromino from the game state
        for (let row = 0; row < this.shape.matrix.length; row++) {
            for (let col = 0; col < this.shape.matrix[0].length; col++) {
                if (this.shape.matrix[row][col]) {
                    gameBoard[row + this.y][col + this.x] = 0;
                }
            }
        }

        // Update y
        this.y += this.dy;
        this.x += this.dx;
        this.dx = 0;
    }

    isColliding() {
        for (let row = 0; row < this.shape.matrix.length; row++) {
            for (let col = 0; col < this.shape.matrix[0].length; col++) {
                if (
                    gameBoard[row + this.y][col + this.x] === 2 &&
                    row + this.y === 19
                ) {
                    return true;
                }
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

const gameOver = false;

let tetromino = new Tetromino(iShape);

const makeTetrominoFall = () => {
    tetromino.delete();
    tetromino.update();
    tetromino.draw();
    // updategameBoard();
};

setInterval(() => {
    if (!tetromino.stopAnimation) {
        makeTetrominoFall();
    } else {
        let randomIndex = Math.floor(Math.random() * shapes.length);
        tetromino = new Tetromino(shapes[randomIndex]);
    }
}, speed);
// loop through the first row of the gameboard, if there is a 1 located there, then the game is over
