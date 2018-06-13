let HighScores = [];
let TwoPlayerHighScores = [];

let isPaused;

let WIDTH = 640;
let HEIGHT = 480;
let hSize = 40;
let vSize = 28;

let BLOCK_SIZE = (640 - 40) / hSize;
let SNAKE_WIDTH = BLOCK_SIZE - 4;


let appleTypes = ['big', 'speed', 'slow', 'minimize'];

function createSpecialApple(player, cb) {
    let type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
    let pos = createApple(player);
    cb({type: type, x: pos.x, y: pos.y});
    console.log(type);
}

function createSpecialApple2(player1, player2, cb) {
    let type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
    let pos = createApple2(player1, player2);
    cb({type: type, x: pos.x, y: pos.y});
    console.log(type);
}

function createApple(trail) {
    // create an apple on a random tile until it doesn't overlap player
    let x, y;
    do {
        x = Math.floor(Math.random() * hSize);
        y = Math.floor(Math.random() * vSize);
    } while (!check(x, y, trail));
    return {x: x, y: y};
}

function createApple2(trail1, trail2) {
    let x, y;
    do {
        x = Math.floor(Math.random() * hSize);
        y = Math.floor(Math.random() * vSize);
    } while (!check2(x, y, trail1, trail2));
    return {x: x, y: y};
}

function check(x, y, trail) {
    for (let el in trail) {
        el = trail[el];
        if (el.x === x && el.y === y)
            return false;
    }
    return true;
}

function check2(x, y, trail1, trail2) {
    return check(x, y, trail1) && check(x, y, trail2);
}

function drawPlayer(ctx, trail, color) {
    ctx.fillStyle = color;
    // ctx.fillRect(left, top, right, bottom)
    trail.forEach(el => ctx.fillRect(10 + el.x * BLOCK_SIZE + 2, 40 + el.y * BLOCK_SIZE + 2, 11, 11));
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
    TwoPlayerHighScores.sort((a, b) => b.score > a.score);
    if (TwoPlayerHighScores.length > 10) {
        TwoPlayerHighScores.pop();
    }
    console.log(TwoPlayerHighScores);
}
