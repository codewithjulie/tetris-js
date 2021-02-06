const canvas = document.querySelector('#gameboard');
const ctx = canvas.getContext('2d');

const canvasWidth = 400;
const canvasHeight = 800;
const squareSize = canvasWidth / 10;
const canvasStartX = squareSize * 4;

ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

ctx.fillStyle = 'blue';
ctx.strokeStyle = 'white';

//const tetrominos = [
//how to create a 2d matrix that will render the 4 squares accordingly?
/*
    o shape [
                [0, 1, 1],
                [0, 1, 1],
                [0, 0, 0]

    ]
    j shape [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0]
            ]
    l shape [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1]
    ]
    s shape [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
    ]
    z shape [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
    ]
    t shape [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
    ]
    i shape [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ]
    
    */

// [0, 1, 1] - how to get 3 squares and color in 1 and 2 index?

const arr = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
];

const drawTetramino = arr => {
    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr[0].length; col++) {
            if (arr[row][col]) {
                ctx.fillRect(
                    0 + col * squareSize + canvasStartX,
                    0 + row * squareSize,
                    squareSize,
                    squareSize
                );
                ctx.strokeRect(
                    0 + col * squareSize + canvasStartX,
                    0 + row * squareSize,
                    squareSize,
                    squareSize
                );
            }
        }
    }
};

drawTetramino(arr);
