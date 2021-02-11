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

const gameState = Array(20);
for (let i = 0; i < gameState.length; i++) {
    gameState[i] = Array(10).fill(0);
}
console.log(gameState);

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
    [1, 0, 0],
    [1, 1, 1],
];
const lShape = [
    [0, 0, 0],
    [0, 0, 1],
    [1, 1, 1],
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
    drawTetromino() {
        // loop through the matrix and color where there is a 1
        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[0].length; col++) {
                if (this.shape[row][col]) {
                    gameState[row + this.y][col + this.x] = 1;
                }
            }
        }

        // for (let row = 0; row < this.shape.length; row++) {
        //     for (let col = 0; col < this.shape[0].length; col++) {
        //         if (this.shape[row][col]) {
        //             ctx.fillRect(
        //                 col * squareSize + canvasStartX,
        //                 this.y + row * squareSize,
        //                 squareSize,
        //                 squareSize
        //             );
        //             ctx.strokeRect(
        //                 col * squareSize + canvasStartX,
        //                 this.y + row * squareSize,
        //                 squareSize,
        //                 squareSize
        //             );
        //         }
        //     }
        // }
    }

    update() {
        if (this.bottomY >= heightInBlocks) {
            this.dy = 0;
            this.stopAnimation = true;
        }
        if (this.x <= 0 || this.x >= widthInBlocks) this.dx = 0;

        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[0].length; col++) {
                if (this.shape[row][col]) {
                    gameState[row + this.y][col + this.x] = 0;
                }
            }
        }
        this.y += this.dy;
        this.bottomY += this.dy;
    }
}

// Makes a tetromino
let tetromino = new Tetromino(lShape);

const makeTetrominoFall = () => {
    if (!tetromino.stopAnimation) {
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            tetromino.update();
            tetromino.drawTetromino();

            updateGameState();
            requestAnimationFrame(makeTetrominoFall);
        }, speed);
    }
};

// if (row[i].every(ele => ele === 1)) this means it is filled up
// then remove this row, and add a row to the top of the board?

// need to figure out how to update this table when pieces drop

makeTetrominoFall();

// const gameState = Array.from(Array(20), () => Array(10).fill(0));

let h = gameState.length;
let w = gameState[0].length;

const updateGameState = () => {
    for (let row = 0; row < h; row++) {
        for (let col = 0; col < w; col++) {
            if (gameState[row][col]) {
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
