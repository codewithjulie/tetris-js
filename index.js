const canvas = document.querySelector('#gameboard');
const ctx = canvas.getContext('2d');

const canvasWidth = 300;
const canvasHeight = 600;
const squareSize = canvasWidth / 10;
const canvasStartX = squareSize * 3;
const canvasStartY = -squareSize * 3;
let speed = 500;

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
        this.dy = squareSize;
        this.stopAnimation = false;
        this.bottomY = this.y + this.shape.length * squareSize;
    }
    drawTetromino() {
        // loop through the matrix and color where there is a 1

        for (let row = 0; row < this.shape.length; row++) {
            for (let col = 0; col < this.shape[0].length; col++) {
                if (this.shape[row][col]) {
                    ctx.fillRect(
                        col * squareSize + canvasStartX,
                        this.y + row * squareSize,
                        squareSize,
                        squareSize
                    );
                    ctx.strokeRect(
                        col * squareSize + canvasStartX,
                        this.y + row * squareSize,
                        squareSize,
                        squareSize
                    );
                }
            }
        }
    }

    update() {
        // Listen to arrow keys
        // Space bar to move directly down
        // Down key to increase speed
        // Up key to rotate
        // make the boundaries,
        if (this.bottomY >= canvas.height) {
            this.dy = 0;
            this.stopAnimation = true;
        }
        if (this.x <= 0 || this.x >= canvas.width) this.dx = 0;
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
            tetromino.drawTetromino();
            tetromino.update();
            requestAnimationFrame(makeTetrominoFall);
        }, speed);
    }
};

makeTetrominoFall();
