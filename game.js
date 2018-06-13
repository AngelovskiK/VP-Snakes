var HighScores = [];
var TwoPlayerHighScores = [];

var isPaused;

var WIDTH = 640;
var HEIGHT = 480;
var hSize = 40;
var vSize = 28;

var BLOCK_SIZE = (640 - 40) / hSize;
var SNAKE_WIDTH = BLOCK_SIZE - 4;

var appleTypes = ['big', 'speed', 'slow', 'minimize'];


function createSpecialApple(player, cb) {
    var type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
    var pos = createApple(player);
    cb({type: type, x: pos.x, y: pos.y});
    console.log(type);
}

function createSpecialApple2(player1, player2, cb) {
    var type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
    var pos = createApple2(player1, player2);
    cb({type: type, x: pos.x, y: pos.y});
    console.log(type);
}



function createApple(trail) {
    // create an apple on a random tile until it doesn't overlap player
    do {
        var x = Math.floor(Math.random() * hSize);
        var y = Math.floor(Math.random() * vSize);
    } while (!check(x, y, trail));
    return {x: x, y: y};
}

function createApple2(trail1, trail2) {
    do {
        var x = Math.floor(Math.random() * hSize);
        var y = Math.floor(Math.random() * vSize);
    } while (!check2(x, y, trail1, trail2));
    return {x: x, y: y};
}

function check(x, y, trail) {
    for (var element in trail) {
        element = trail[element];
        if (element.x == x && element.y == y)
            return false;
    }
    return true;
}

function check2(x, y, trail1, trail2) {
    return check(x, y, trail1) && check(x, y, trail2);
}

function drawPlayer(ctx, trail, color) {
    ctx.fillStyle = color;
    trail.forEach(element => {
        ctx.fillRect(10 + element.x * BLOCK_SIZE + 2, 40 + element.y * BLOCK_SIZE + 2, 11, 11);
    });
}

function addHighScore(score, name) {
    HighScores.push({score: score, name: name});
    HighScores.sort((a, b) => {
        return b.score > a.score;
    });
    if (HighScores.length > 10)
        HighScores.pop();
    console.log(HighScores);
}

function add2playerHighScore(score, name) {
    TwoPlayerHighScores.push({score: score, name: name});
    TwoPlayerHighScores.sort((a, b) => {
        return b.score > a.score;
    });
    if (TwoPlayerHighScores.length > 10)
        TwoPlayerHighScores.pop();
    console.log(TwoPlayerHighScores);
}
