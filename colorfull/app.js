function toggleCollapse(containerId) {
    const video =  document.getElementById('videoContainer');
    const canvas = document.getElementById('canvasContainer');
    const playbut = document.getElementById('play');
    const gamebut = document.getElementById('game');
    if(containerId=='videoContainer') {
        video.style.display = 'block'; 
        canvas.style.display = 'none'; 
        video.classList.remove("max-h-0");
        canvas.classList.add("max-h-0");
        playbut.classList.add("resize-small");
        gamebut.classList.remove("resize-small");
    } else {
        
        video.style.display = 'none'; 
        canvas.style.display = 'block'; 
        video.classList.add("max-h-0");
        canvas.classList.remove("max-h-0");
        playbut.classList.remove("resize-small");
        gamebut.classList.add("resize-small");
    }
}


//Select the canvas
const canvas = document.querySelector('#MyCanvas');
const ctx = canvas.getContext('2d');

//added by me
const borderStyles = ['10px solid lightgreen', '10px solid mediumpurple', '10px solid lightsalmon', '10px solid moccasin']
const myArray = [0, 1, 2, 3];
let Mytimer; 
const playAgainX = canvas.width / 6.5;
const playAgainY = canvas.height / 2 + 50; 
let seconds =0 ; 
let minutes= 0 ; 
let firstKeyPressed=false;
let rotateBorderIndex = 0;
function Timer() {
  if (firstKeyPressed) {
    seconds++
    rotateBorderIndex++
    if (rotateBorderIndex == 4) {
      rotateBorderIndex = 0;
    }
    if (seconds > 59) {
      seconds = 0;
      minutes++;
    }
  }
  const RotatedArray = rotateArray(myArray); 
  canvas.style.borderTop = borderStyles[RotatedArray[rotateBorderIndex][0]];
  canvas.style.borderRight = borderStyles[RotatedArray[rotateBorderIndex][1]];
  canvas.style.borderBottom = borderStyles[RotatedArray[rotateBorderIndex][2]];
  canvas.style.borderLeft = borderStyles[RotatedArray[rotateBorderIndex][3]];
}
canvas.addEventListener("click", handleCanvasClick); //added by me
canvas.addEventListener("mousemove", mouseMove); //added by me

function mouseMove(event) { //added by me
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;
    if (
        clickX >= playAgainX &&
        clickX <= playAgainX + ctx.measureText('Play Again').width &&
        clickY >= playAgainY -30 &&
        clickY <= playAgainY +20
    ) {
        canvas.style.cursor = "pointer";
    }
    else {
        canvas.style.cursor = "default";
    }
}

function handleCanvasClick(event) { //added by me
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;
    // Check if the click is within the bounds of the "Play Again" text
    if (
      clickX >= playAgainX &&
      clickX <= playAgainX + ctx.measureText('Play Again').width &&
      clickY >= playAgainY - 15 &&
      clickY <= playAgainY
    ) {
      resetGame();
    }
  }

function rotateArray(myArray) { //added by me
  const result = [];
  myArray.forEach(() => {
    myArray.unshift(myArray.pop());
    result.push([...myArray]); // Create a copy to avoid modifying the original array
  });
  return result;
}



function resetGame() {  //added by me
  clearInterval(Mytimer);
  headX = 5;
  headY = 5;
  seconds=0;
  firstKeyPressed=false;
  minutes=0;
  snakeParts.length = 0;
  tailLength = 2;
  appleX = 3;
  appleY = 3;
  inputsXVelocity = 0;
  inputsYVelocity = 0;
  xVelocity = 0;
  yVelocity = 0;
  score = 0;
  speed = 5;
  level = 1; 
  drawGame();
}
  


document.body.addEventListener("keydown", keyDown);

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 5; //default speed

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;
let level = 1; //added by me

const gulpSound = new Audio("source/gulp.mp3");
const gameOverSound = new Audio ("source/Gameover.mp3")  //added by me

//game loop
function drawGame() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;

  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();

  drawState();

  if (score > 28) {  //added by me
    speed = 23;
    level = 10;
  } else if (score > 25) {
    speed = 21;
    level = 9;
  } else if (score > 22) {
    speed = 19;
    level = 8;
  } else if (score > 19) {
    speed = 17;
    level = 7;
  } else if (score > 16) {
    speed = 15;
    level = 6;
  } else if (score > 13) {
    speed = 13;
    level = 5;
  } else if (score > 10) {
    speed = 10;
    level = 4;
  } else if (score > 7) {
    speed = 7;
    level = 3;
  } else if (score >= 3) {
    speed = 6;
    level = 2;
  }
  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  //walls
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    clearInterval(Mytimer);
    gameOverSound.play();

    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";
    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px Verdana";

      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", " magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "red");
      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
      ctx.fillText("Play Again",playAgainX, playAgainY);
    }

    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}

function drawState() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("Score " + score, canvas.width - 50, 10);
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  ctx.fillText(`${formattedMinutes}:${formattedSeconds}` , canvas.width - 100, 10);
  ctx.fillText(`Level ${level}` , canvas.width - 150, 10);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    gulpSound.play();
  }
}


function keyDown(event) {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
        event.preventDefault(); //added by me
        if(!firstKeyPressed) {//added by me
            Mytimer = setInterval(Timer,1000) //added by me
        } 
        firstKeyPressed = true;   //added by me
    }
    //up
    if (event.keyCode == 38 || event.keyCode == 87) {
        //87 is w
        if (inputsYVelocity == 1) return;
        inputsYVelocity = -1;
        inputsXVelocity = 0;
    }

    //down
    if (event.keyCode == 40 || event.keyCode == 83) {
        // 83 is s
        if (inputsYVelocity == -1) return;
        inputsYVelocity = 1;
        inputsXVelocity = 0;
    }

    //left
    if (event.keyCode == 37 || event.keyCode == 65) {
        // 65 is a
        if (inputsXVelocity == 1) return;
        inputsYVelocity = 0;
        inputsXVelocity = -1;
    }

    //right
    if (event.keyCode == 39 || event.keyCode == 68) {
        //68 is d
        if (inputsXVelocity == -1) return;
        inputsYVelocity = 0;
        inputsXVelocity = 1;
    }
}

drawGame();

// Tutorial Citation: 
// https://www.youtube.com/watch?v=7Azlj0f9vas

// Github source code: 
// https://github.com/CodingWith-Adam/snake