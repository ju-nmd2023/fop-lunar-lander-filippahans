let fishY; //The vertical position of the fish
let velocity; //The speed and direction of the fish
let gravity; //The gravitional force acting
let thrust; //The upward thrust
let gameStarted = false; //Track whether the game has ended
let gameEnded = false; //Track whether the game has ended
let win = false; //Track whether the player has won
let loss = false; //Track whether the player has lost
let bubbles = []; //Array the bubbles
let sandY = 660; //The vertical position of the sand

function setup() {
  createCanvas(700, 900);
  fishY = height / 2.5; //The vertical position of the fish
  velocity = 3; //The velocity of the fish
  gravity = 0.1; //The gravitional force acting
  thrust = -2; //The upward thrust
}

//Generate Bubbles
for (let i = 0; i < 20; i++) {
  const bubble = {
    x: Math.floor(Math.random() * 700), //The horizontal position of the bubbles
    y: Math.floor(Math.random() * 900), //The vertical position of the bubbles
    circle: Math.random() * 0.5, //The size of the bubbles
    alpha: Math.random(), //The transparency of the bubbles
  };
  bubbles.push(bubble); //Add the bubble object to the bubbles array
}

function draw() {
  //The bubble background
  noStroke();
  background(0, 106, 149);
  //The bubbles
  for (let bubble of bubbles) {
    fill(155, 190, 201, Math.abs(Math.sin(bubble.alpha)) * 255);
    ellipse(bubble.x, bubble.y, 50);
    bubble.y += bubble.circle; //Moves the bubbles upward
    if (bubble.y > height) {
      bubble.y = 0; //Reset the bubbles position if it goes beyond the canvas
    }
  }

  //The game elements
  if (!gameStarted) {
    startScreen(); //Display the start screen
  } else if (!gameEnded) {
    game(); //Start the game
  } else {
    resultScreen(); //Display the result screen
  }
}

function startScreen() {
  //The start screen
  stroke(0, 0, 0);
  strokeWeight(2);
  fill(177, 156, 217);
  textAlign(CENTER, CENTER);
  textSize(60);
  text("Fish Lander", width / 2, height / 2 - 320);
  fill(255, 255, 255);
  textSize(20);
  text("Press SPACE or DOWN ARROW to start", width / 2, height / 2 - 260);

  //The fish on the startscreen
  Fish();
}

function game() {
  //The gravity to the fish
  velocity += gravity;
  fishY += velocity;

  //Checks if the fish lands on the sand
  if (fishY + 120 >= sandY) {
    if (isSmoothLanding()) {
      gameEnded = true;
      win = true; //Sets the win state if the landing is smooth
    } else {
      gameEnded = true;
      loss = true; //Sets the loss state if the landing is not smooth
    }
  }

  //The fish during game
  Fish();

  //Checks for collision with the top or bottom of the canvas
  if (fishY > height) {
    gameEnded = true;
    loss = true; //Set loss state if the fish is below the canvas
  } else if (fishY < 0) {
    gameEnded = true;
    win = true; //Set win state if the fish is above the canvas
  }
}

//The velocity range for smooth landing, help from Chat GPT
function isSmoothLanding() {
  const smoothMinVelocity = -3;
  const smoothMaxVelocity = 3;
  return velocity >= smoothMinVelocity && velocity <= smoothMaxVelocity;
}

function resultScreen() {
  //The result screen
  textAlign(CENTER, CENTER);
  textSize(70);
  textStyle(BOLD);
  if (win) {
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(242, 154, 167);
    text("You Won!", width / 2, height / 2 - 180); //If the player wins
    WinFish();
  } else {
    stroke(0, 0, 0);
    strokeWeight(2);
    fill(217, 33, 33);
    text("GAME OVER", width / 2, height / 2 - 180); //If the player loses
    DeadFish();
  }
  stroke(0, 0, 0);
  strokeWeight(2);
  fill(255, 255, 255);
  textSize(20);
  text("Press SPACE or DOWN ARROW to restart", width / 2, height / 2 - 120);
}

function keyPressed() {
  //Key press events, help from Chat GPT
  if (!gameStarted) {
    gameStarted = true; //Start the game when a key is pressed
  } else if (gameEnded && (keyCode === 32 || keyCode === DOWN_ARROW)) {
    reset(); //Restart the game if it has ended and space or arrow down is pressed
  } else if (keyCode === 32 || keyCode === DOWN_ARROW) {
    applyThrust(); //Apply thrust to the fish when space or down arrow is pressed
  }
}

function applyThrust() {
  //The upward thrust to the fish
  velocity += thrust;
}

function reset() {
  //Reset the game
  gameStarted = false;
  gameEnded = false;
  win = false;
  loss = false;
  fishY = height / 2; //Reset the vertical position of the fish
  velocity = 0; //Reset the velocity of the fish
}

//The fish during the game
function Fish() {
  //The sand
  noStroke();
  fill(198, 174, 146);
  rect(0, 660, 700, 300);

  //The body behind the stripes
  noStroke();
  fill(236, 103, 71);
  ellipse(350, fishY, 180, 240);

  //Wthe white stripes
  noStroke();
  fill(255, 255, 255);
  ellipse(350, fishY + 10, 180, 240);

  //The body
  fill(236, 103, 71);
  ellipse(350, fishY + 20, 180, 240);

  //The fins on the sides
  noStroke();
  fill(236, 103, 71);
  ellipse(255, fishY + 20, 100, 40);
  ellipse(440, fishY + 20, 100, 40);
  ellipse(248, fishY + 35, 45, 30);
  ellipse(453, fishY + 35, 45, 30);

  //The fin on the top
  noStroke();
  ellipse(350, fishY - 92, 40, 100);

  //The White in the eyes
  push();
  stroke(0, 0, 0);
  strokeWeight(2);
  fill(255, 255, 255);
  ellipse(315, fishY + 10, 45);
  ellipse(385, fishY + 10, 45);
  pop();

  //The pupils
  fill(0, 0, 0);
  ellipse(318, fishY + 16, 30);
  ellipse(382, fishY + 16, 30);

  //The white in the pupils
  fill(255, 255, 255);
  ellipse(322, fishY + 8, 6);
  ellipse(386, fishY + 8, 6);

  //Cheeks
  noStroke();
  fill(236, 103, 71);
  ellipse(318, fishY + 35, 45, 30);
  ellipse(386, fishY + 35, 45, 30);

  //The mouth
  stroke(217, 33, 33);
  strokeWeight(3);
  fill(242, 154, 167);
  arc(350, fishY + 80, 70, 60, 0, 3.14);

  //The eyebrows
  noFill();
  stroke(0, 0, 0);
  arc(315, fishY - 40, 50, 30, 10, 345);
  arc(384, fishY - 40, 50, 30, 10, 345);

  //The seaweed to the left
  noStroke();
  fill(18, 174, 146);
  ellipse(118, 650, 8, 100);
  ellipse(130, 630, 8, 100);
  ellipse(142, 650, 8, 100);

  //The seaweed to the right
  ellipse(530, 574, 40, 15);
  ellipse(570, 574, 40, 15);
  ellipse(570, 600, 40, 15);
  ellipse(530, 600, 40, 15);
  ellipse(570, 625, 40, 15);
  ellipse(530, 625, 40, 15);
  ellipse(570, 648, 40, 15);
  ellipse(530, 648, 40, 15);
  ellipse(550, 553, 15, 40);
  ellipse(550, 650, 6, 150);

  //The crab body
  noStroke();
  fill(217, 33, 33);
  ellipse(480, 750, 60, 35);

  //The crab eyes
  ellipse(468, 730, 5, 20);
  ellipse(490, 730, 5, 20);
  ellipse(490, 714, 15);
  ellipse(468, 714, 15);

  //The crab legs
  ellipse(468, 768, 5, 20);
  ellipse(498, 768, 5, 20);
  ellipse(460, 762, 5, 20);
  ellipse(490, 763, 5, 20);

  //The crab arms
  ellipse(512, 750, 20, 5);
  ellipse(447, 750, 20, 5);
  arc(435, 745, 22, 22, 10, 3.14);
  arc(526, 743, 22, 22, 10, 3.14);

  //The white in the eyes, crab
  fill(255, 255, 255);
  ellipse(490, 714, 11);
  ellipse(468, 714, 11);

  //The pupils, crab
  fill(0, 0, 0);
  ellipse(490, 712, 7);
  ellipse(468, 712, 7);

  //The mouth, crab
  fill(242, 154, 167);
  arc(480, 746, 15, 15, 0, 3.14);

  //The white light on the shell
  fill(255, 255, 266);
  ellipse(154, 711, 12);
  ellipse(163, 717, 15);
  ellipse(175, 725, 20);
  ellipse(190, 737, 30);
  ellipse(209, 749, 40);

  //The shell
  fill(177, 156, 217);
  ellipse(153, 713, 12);
  ellipse(163, 720, 15);
  ellipse(175, 728, 20);
  ellipse(190, 740, 30);
  ellipse(208, 752, 40);
}

//The dead fish if loss
function DeadFish() {
  //The body behind the stripes
  noStroke();
  fill(236, 103, 71);
  ellipse(350, fishY, 180, 240);

  //the white stripes
  noStroke();
  fill(255, 255, 255);
  ellipse(350, fishY + 10, 180, 240);

  //The body
  fill(236, 103, 71);
  ellipse(350, fishY + 20, 180, 240);

  //The fins on the sides
  noStroke();
  fill(236, 103, 71);
  ellipse(255, fishY + 20, 100, 40);
  ellipse(440, fishY + 20, 100, 40);
  ellipse(248, fishY + 35, 45, 30);
  ellipse(453, fishY + 35, 45, 30);

  //The fin on the top
  noStroke();
  ellipse(350, fishY - 92, 40, 100);

  //The eyes, crossed
  push();
  fill(0, 0, 0);
  stroke(0);
  strokeWeight(4);
  //left eye
  line(315 - 15, fishY + 10 - 15, 315 + 15, fishY + 10 + 15); // Diagonal line from top-left to bottom-right
  line(315 + 15, fishY + 10 - 15, 315 - 15, fishY + 10 + 15); // Diagonal line from top-right to bottom-left

  //right eye
  line(385 - 15, fishY + 10 - 15, 385 + 15, fishY + 10 + 15); // Diagonal line from top-left to bottom-right
  line(385 + 15, fishY + 10 - 15, 385 - 15, fishY + 10 + 15); // Diagonal line from top-right to bottom-left

  //The mouth
  line(330, fishY + 80, 370, fishY + 80); // Straight line for the mouth
}

//The happy fish if won
function WinFish() {
  //The body behind the stripes
  noStroke();
  fill(236, 103, 71);
  ellipse(350, fishY, 180, 240);

  //The white stripes
  noStroke();
  fill(255, 255, 255);
  ellipse(350, fishY + 10, 180, 240);

  //The body
  fill(236, 103, 71);
  ellipse(350, fishY + 20, 180, 240);

  //The fins on the sides
  noStroke();
  fill(236, 103, 71);
  ellipse(255, fishY + 20, 100, 40);
  ellipse(440, fishY + 20, 100, 40);
  ellipse(248, fishY + 35, 45, 30);
  ellipse(453, fishY + 35, 45, 30);

  //The fin on the top
  noStroke();
  ellipse(350, fishY - 92, 40, 100);

  //White in the eyes
  push();
  stroke(0, 0, 0);
  strokeWeight(2);
  fill(255, 255, 255);
  ellipse(315, fishY + 10, 45);
  ellipse(385, fishY + 10, 45);
  pop();

  //The pupils
  fill(0, 0, 0);
  ellipse(318, fishY + 16, 30);
  ellipse(382, fishY + 16, 30);

  //The white in the pupils
  fill(255, 255, 255);
  ellipse(322, fishY + 8, 6);
  ellipse(386, fishY + 8, 6);

  //The mouth
  stroke(217, 33, 33);
  strokeWeight(3);
  fill(242, 154, 167);
  arc(350, fishY + 80, 70, 60, 0, 3.14);

  //The eyebrows
  noFill();
  stroke(0, 0, 0);
  arc(315, fishY - 40, 50, 30, 10, 345);
  arc(384, fishY - 40, 50, 30, 10, 345);
}
