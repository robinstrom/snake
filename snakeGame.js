window.onload = function() {
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game, 1000/10);
}

playerX = playerY = 10;
gridSize = tc = 20;
appleX = appleY = 15;
xVelocity = yVelocity = 0;
trail = [];
tail = 5;
score = 0;

function game() {
  playerX+=xVelocity;
  playerY+=yVelocity;

  if(playerY < 0) {
    playerY = tc-1;
  }
  if(playerY > tc-1) {
    playerY = 0;
  }
  if(playerX < 0) {
    playerX = tc-1;
  }
  if(playerX > tc-1) {
    playerX = 0;
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);

  ctx.fillStyle = "lime";
  for(let i=0; i<trail.length; i++) {
    ctx.fillRect(trail[i].x*gridSize, trail[i].y*gridSize, gridSize-2, gridSize-2);
    if(trail[i].x == playerX && trail[i].y == playerY) {
      tail = 5;
      score = 0;
      ctx.fillStyle = "lime";
      ctx.font = "16px Verdana";
      ctx.fillText("Press up to start", 70, 70);
    }
  }
  trail.push({x:playerX, y:playerY});
  while(trail.length > tail) {
    trail.shift();
  }

  if(appleX == playerX && appleY == playerY) {
    tail++;
    score++;
    appleX = Math.floor(Math.random() * tc);
    appleY = Math.floor(Math.random() * tc);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(appleX*gridSize, appleY*gridSize, gridSize-2, gridSize-2);

  ctx.fillStyle = "lime";
  ctx.font = "20px Verdana";
  ctx.fillText("Score: "+ score, 10, canv.height - 20);
}

function keyPush(evt) {
  switch(evt.keyCode) {
    case 37: xVelocity=-1; yVelocity=0;
      break;
    case 38: xVelocity=0; yVelocity=-1;
      break;
    case 39: xVelocity=1; yVelocity=0;
      break;
    case 40: xVelocity=0; yVelocity=1;
      break;
  }

}
