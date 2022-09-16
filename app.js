const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('.score');

const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = -2;
let yDirection = 2;

const userStart = [230, 10];
let curretnPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerId;
let score = 0;

// draw block

class block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
        this.topLeft = [xAxis, yAxis + blockHeight]
    }
}
// all my blocks
const blocks = [
    new block(10, 270),
    new block(120, 270),
    new block(230, 270),
    new block(340, 270),
    new block(450, 270),
    new block(10, 240),
    new block(120, 240),
    new block(230, 240),
    new block(340, 240),
    new block(450, 240),
    new block(10, 210),
    new block(120, 210),
    new block(230, 210),
    new block(340, 210),
    new block(450, 210),

]
// console.log(blocks)

// draw all blocks

function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        // console.log(i)
        const block = document.createElement('div');
        block.classList.add('block');

        block.style.left = blocks[i].bottomLeft[0] + "px"
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block);
    }
}

addBlocks();

// user draw

const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
userDraw()

// Draw Ball

const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball)
drawBall()

// User Moving

function userMove(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (curretnPosition[0] > 0) {
                curretnPosition[0] -= 10
                userDraw()
            }
            break;
        case 'ArrowRight':
            if (curretnPosition[0] < boardWidth - blockWidth) {
                curretnPosition[0] += 10
                userDraw()
            }
            break
    }

}

document.addEventListener('keydown', userMove)


// User draw for moving

function userDraw() {
    user.style.left = curretnPosition[0] + 'px'
    user.style.bottom = curretnPosition[1] + 'px'
}

// Draw ball position

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}


// Move Ball

function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkCollision()
}

timerId = setInterval(moveBall, 30)


// Check for collisions

function checkCollision() {

    // Check for block collision
    for (let i = 0; i < blocks.length; i++) {

        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
            // console.log(allBlocks)
            // Check game win
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'You win!'
                clearInterval(timerId)
                document.removeEventListener('keydown', userMove)
            }
        }

    }

    // check for Wall collision
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
        changeDirection()
    }

    // Check for user collision

    if (
        (ballCurrentPosition[0] > curretnPosition[0] && ballCurrentPosition[0] < curretnPosition[0] + blockWidth) && (ballCurrentPosition[1] > curretnPosition[1] && ballCurrentPosition[1] < curretnPosition[1] + blockHeight)
    ) {
        changeDirection()
    }


    // Check game over

    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You Lose'
        document.removeEventListener('keydown', userMove)
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}


