function ShowMenu(container){
  //SET UP BUTTONS AND CLICK EVENTS
  container.innerHTML = 'SNAKES GAME';
  var SPBtn = document.createElement("button");
  SPBtn.appendChild(document.createTextNode("1 Player"));
  SPBtn.className = 'menuItem';
  SPBtn.addEventListener("click", (e) =>{
    StartSinglePlayer(container);
  })

  var MPBtn = document.createElement("button");
  MPBtn.appendChild(document.createTextNode("2 Player"));
  MPBtn.className = 'menuItem';
  MPBtn.addEventListener("click", (e) =>{
    StartMultiPlayer(container);
  });

  var HSbtn = document.createElement("button");
  HSbtn.appendChild(document.createTextNode("1 Player High Scores"));
  HSbtn.className = 'menuItem';
  HSbtn.addEventListener("click", (e) =>{
    ShowHighScores(container);
  }); 
  
  var TPHSbtn = document.createElement("button");
  TPHSbtn.appendChild(document.createTextNode("2 Player High Scores"));
  TPHSbtn.className = 'menuItem';
  TPHSbtn.addEventListener("click", (e) =>{
    ShowTwoPlayerHighScores(container);
  })
  
  container.appendChild(SPBtn);
  container.appendChild(MPBtn);
  container.appendChild(HSbtn);
  container.appendChild(TPHSbtn);
}

var HighScores = [];
var TwoPlayerHighScores = [];

var isPaused;

var hSize = 40;
var vSize = 28;

function StartSinglePlayer(container){
  // start game, set up canvas, and create quit button
  isPaused = false;
  var cycle;

  container.innerHTML = '';
  var canvas = document.createElement("canvas");
  canvas.setAttribute('width', '640');
  canvas.setAttribute('height', '480');
  canvas.id = 'game';
  container.appendChild(canvas);
  var quitButton = document.createElement("button");
  quitButton.className = 'quit';
  quitButton.appendChild(document.createTextNode("x"));
  quitButton.addEventListener("click", ()=>{ShowMenu(container)});
  
  container.appendChild(quitButton);

  var ctx = canvas.getContext("2d");
  ctx.font="22px Arial";

  //initialize the player
  var player = [];
  var px = 5;
  var py = 5;
  var length = 5;
  var dx = 1; var dy = 0;  
  
  //initialize the apple
  var apple = createApple(player);
  var appleimg = document.getElementById("apple");

  var interval = 60;
  document.addEventListener("keydown", (e)=>{
    //handle direction changes and pauses
    switch(e.keyCode){
      case 37:
        dx = -1;
        dy = 0;
        break;
      case 38:
        dx = 0;
        dy = -1;
        break;
      case 39:
        dx = 1;
        dy = 0;
        break;
      case 40:
        dx = 0;
        dy = 1;
        break;
      case 80:
        isPaused = !isPaused;
        if(isPaused)
          clearInterval(cycle);
        else
          cycle =  setInterval(game, interval)
        break;
    }
  })

  cycle = setInterval(game, interval);

  function game(){
    //refresh
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 640, 480);
  
    //draw head and apple
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(10+px*15, 40+py*15, 15, 15);
    ctx.drawImage(appleimg, 10+apple.x*15, 40+apple.y*15)
    
    //check death
    if (check(px, py, player)){
      //create body and draw it
      player.push({x: px, y:py});
      if(player.length > length)
        player.shift();

      drawPlayer(ctx, player, '#0000FF');
      //move player
      px+=dx;
      py+=dy;

      //wrap screen
      if(px==hSize)
        px=0;
      else if(px==-1)
        px=hSize-1;
      if(py==vSize)
        py=0;
      else if(py==-1)
        py=vSize-1;

      //check if apple is eaten 
      if(px==apple.x && py==apple.y){
        length++;
        if(length%5==0){
          //speed game up every 5th apple
          clearInterval(cycle);
          interval*=0.99;
          cycle = setInterval(game, interval);
        }
        apple = createApple(player);
      }

      ctx.fillText("Player 1 - Length: "+length, 15, 18);
    }else{
      getName(canvas, ctx, "Enter name: ", function(name){
        addHighScore(length, name);
        ShowMenu(container);
      });
      clearInterval(cycle);
    }
  }
}
function getName(canvas, ctx, text, cb){
  //setup screen
  var name = '';

  ctx.fillStyle = 'white';
  ctx.fillRect(100, 180, 440, 60);

  ctx.fillStyle = 'black';
  ctx.fillText(text+name, 110, 210);

  //listen to keystrokes
  document.addEventListener("keyup", listenToName, true);
  function listenToName(e){
    // if character or number add to name, if backspace shorten last char, if enter
    // callback function and remove this event listener
    if(e.key.length == 1 && e.key.match(/[a-z0-9]/i))
      name+=e.key;
    else if(e.key == 'Backspace')
      name = name.slice(0, -1);
    else if(e.key == 'Enter'){
      cb(name);
      document.removeEventListener("keyup", listenToName, true);
    }
    //refresh name dialog
    ctx.fillStyle = 'white';
    ctx.fillRect(100, 180, 440, 60);

    ctx.fillStyle = 'black';
    ctx.fillText(text+name, 110, 210);
  }
}

function ShowHighScores(container){
  container.innerHTML = '';
  for(var score in HighScores){
    container.innerHTML += (parseInt(score)+1)+'. '+HighScores[score].name+' - '+HighScores[score].score+'<br/>';
  }
  var backButton = document.createElement("button");
  backButton.appendChild(document.createTextNode("Go Back"));
  backButton.addEventListener("click", function(){ShowMenu(container);});
  backButton.className = 'menuItem';

  container.appendChild(backButton);
}

function ShowTwoPlayerHighScores(container){
  container.innerHTML = '';
  for(var score in TwoPlayerHighScores){
    container.innerHTML += (parseInt(score)+1)+'. '+TwoPlayerHighScores[score].name+' - '+TwoPlayerHighScores[score].score+'<br/>';
  }
  var backButton = document.createElement("button");
  backButton.appendChild(document.createTextNode("Go Back"));
  backButton.addEventListener("click", function(){ShowMenu(container);});
  backButton.className = 'menuItem';

  container.appendChild(backButton);
}

function createApple(trail){
  // create an apple on a random tile until it doesn't overlap player
  do{
    var x = Math.floor(Math.random()*hSize);
    var y = Math.floor(Math.random()*vSize);
  }while(!check(x, y, trail));
  return {x: x, y: y};
}
function createApple2(trail1, trail2){
  do{
    var x = Math.floor(Math.random()*hSize);
    var y = Math.floor(Math.random()*vSize);
  }while(!check2(x, y, trail1, trail2));
  return {x: x, y: y};
}

function check(x, y, trail){
  for(var element in trail){
    element = trail[element];
    if(element.x == x && element.y == y)
      return false;
  }
  return true;
}
function check2(x, y, trail1, trail2){
  return check(x, y, trail1)&&check(x, y, trail2);
}
function drawPlayer(ctx, trail, color){
  ctx.fillStyle = color;
  trail.forEach(element => {
    ctx.fillRect(10+element.x*15+2, 40+element.y*15+2, 11, 11);
  });
}

function addHighScore(score, name){
  HighScores.push({score: score, name: name});
  HighScores.sort((a, b)=>{return b.score > a.score;});
  if(HighScores.length>10)
    HighScores.pop();
  console.log(HighScores);
}
function add2playerHighScore(score, name){
  TwoPlayerHighScores.push({score: score, name: name});
  TwoPlayerHighScores.sort((a, b)=>{return b.score > a.score;});
  if(TwoPlayerHighScores.length>10)
    TwoPlayerHighScores.pop();
  console.log(TwoPlayerHighScores);
}

function StartMultiPlayer(){
  //initalize game canas, same as single player
  isPaused = false;
  container.innerHTML = '';
  var canvas = document.createElement("canvas");
  canvas.setAttribute('width', '640');
  canvas.setAttribute('height', '480');
  canvas.id = 'game';
  var ctx = canvas.getContext("2d");
  ctx.font="22px Arial";
  var quitButton = document.createElement("button");
  quitButton.className = 'quit';
  quitButton.appendChild(document.createTextNode("x"));
  quitButton.addEventListener("click", ()=>{ShowMenu(container)});

  container.appendChild(quitButton);
  container.appendChild(canvas);

  //set up both players starting stats
  var player1 = [];
  var p1x = 5;
  var p1y = 5;
  var length1 = 5;
  var player2 = [];
  var p2x = 15;
  var p2y = 15;
  var length2 = 5;

  //create and set up each player's apple
  var apple1 = createApple2(player1, player2);
  var apple2 = createApple2(player1, player2);
  var apple1img = document.getElementById("apple");
  var apple2img = document.getElementById("apple2");

  var d1x = 1; var d1y = 0;  
  var d2x = -1; var d2y = 0;  
  document.addEventListener("keydown", (e)=>{
    // change either player's direction or pause
    switch(e.keyCode){
      case 37:
        d1x = -1;
        d1y = 0;
        break;
      case 38:
        d1x = 0;
        d1y = -1;
        break;
      case 39:
        d1x = 1;
        d1y = 0;
        break;
      case 40:
        d1x = 0;
        d1y = 1;
        break;
      case 65:
        d2x = -1;
        d2y = 0;
        break;
      case 87:
        d2x = 0;
        d2y = -1;
        break;
      case 68:
        d2x = 1;
        d2y = 0;
        break;
      case 83:
        d2x = 0;
        d2y = 1;
        break;
      case 80:
        isPaused = !isPaused;
        if(isPaused)
          clearInterval(cycle);
        else
          cycle = setInterval(game, 60)
        break;
    }
  })

  cycle = setInterval(game, 60);
  function game(){
    //refresh
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 640, 480);
    // draw player 1's head and apple
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(10+p1x*15, 40+p1y*15, 15, 15);
    ctx.drawImage(apple1img, 10+apple1.x*15, 40+apple1.y*15);
    // draw player 2's head and apple
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(10+p2x*15, 40+p2y*15, 15, 15);
    ctx.drawImage(apple2img, 10+apple2.x*15, 40+apple2.y*15);
    
    //check colissions
    if (check2(p1x, p1y, player1, player2)&&check2(p2x, p2y, player1, player2)){
      //shift boddies and draw them
      player1.push({x: p1x, y:p1y});
      player2.push({x: p2x, y:p2y});
      if(player1.length > length1)
        player1.shift();
      if(player2.length > length2)
        player2.shift();

      drawPlayer(ctx, player1, '#0000FF');
      p1x+=d1x;
      p1y+=d1y;
      drawPlayer(ctx, player2, '#FF0000');
      p2x+=d2x;
      p2y+=d2y;

      //wrap both players
      if(p1x==hSize)
        p1x=0;
      else if(p1x==-1)
        p1x=hSize-1;
      if(p1y==vSize)
        p1y=0;
      else if(p1y==-1)
        p1y=vSize-1;
      if(p2x==hSize)
        p2x=0;
      else if(p2x==-1)
        p2x=hSize-1;
      if(p2y==vSize)
        p2y=0;
      else if(p2y==-1)
        p2y=vSize-1;


      //if any of them has eaten an apple, grow them
      if(p1x==apple1.x && p1y==apple1.y){
        length1++;
        apple1 = createApple(player1);
      }
      if(p2x==apple2.x && p2y==apple2.y){
        length2++;
        apple2 = createApple(player2);
      }

      drawPlayer(ctx, player2, '#0000FF');
      ctx.fillText("Player 1 - Length: "+length1, 15, 18);
      drawPlayer(ctx, player2, '#FF0000');
      ctx.fillText("Player 2 - Length: "+length2, 315, 18);
    }else{
      getName(canvas, ctx, "Enter team name: ", function(name){
        add2playerHighScore(length1+length2, name);
        ShowMenu(container);
      });
      clearInterval(cycle);
    }
  }
}