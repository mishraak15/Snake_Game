let inputDir = { x: 0, y: 0 };
let intro = new Audio('./assets/intro.mp3');
let move = new Audio('./assets/moveBeep.wav');
let eat_sound = new Audio('./assets/snake_eat.mp3');
let hit = new Audio('./assets/hit.wav');
let gameOver = new Audio('./assets/victory_tone.mp3');
let board = document.querySelector('.board')
let highscorebox = document.getElementById('highscore');
let speed = 5;
let score = 0;
let highscoreval = 0;
let lastPaintTime = 0
let a = 2;
let b = 17;
let snakeArr = [
    { x: 13, y: 15 }
];

let food = { x: 14, y: 13 };

function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y < 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    // Update the snake variable
    if (isCollide(snakeArr)) {
        intro.pause();
        hit.play();
        gameOver.play();
        inputDir = { x: 0, y: 0 };
        // alert("Game Over");
        let gameover = document.getElementById('gameover');
        gameover.style.visibility = "visible";
        gameover.classList.add('go');

        setTimeout(() => {
            gameover.style.visibility = "hidden";
            gameover.classList.remove('go');
            snakeArr = [
                { x: 13, y: 15 }
            ];
            // let highscore = localStorage.getItem('highscore');
            // console.log(highscore);
            // if (highscore == null) {
            //     localStorage.setItem("highscore", JSON.stringify(highscoreval));
            // }
            // else {
            //     highscoreval = JSON.parse(highscore);
            //     highscorebox.innerHTML = `Hi Score: ${highscoreval}`;
            // }
            score = 0;
            speed = 5;
            document.getElementById('score').innerHTML = `Score: ${score}`;

        }, 2000);
    }

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        speed = speed + 0.2;
        eat_sound.play();
        score = score + 1;
        document.getElementById('score').innerHTML = `Score: ${score}`;

        if (score > highscoreval) {
            highscoreval=score;
            highscorebox.innerHTML = `Hi Score: ${highscoreval}`;
        }

        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        //   console.log(snakeArr);
    }


    //    MOving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Display snake and food

    // Display snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });


    // Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

let highscore = localStorage.getItem('highscore');
console.log(highscore);
if (highscore == null) {
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else {
    highscoreval = JSON.parse(highscore);
    highscorebox.innerHTML = `Hi Score: ${highscoreval}`;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    intro.play();
    intro.loop = true;
    // console.log(e.key);
    switch (e.key) {
        case "ArrowUp":
            move.play();
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            move.play();
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            move.play();
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            move.play();
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;

    }
})