let HighScores = [];
let TwoPlayerHighScores = [];

let isPaused;

var WIDTH = 640;
var HEIGHT = 480;

// let vertical_size = 40;
// let horizontal_size = 28;
const hSize = 12;
const vSize = 8;

let BLOCK_SIZE = (640 - hSize) / hSize;
let BLOCK_SIZE_H = (WIDTH) / hSize;
let BLOCK_SIZE_V = (HEIGHT) / vSize;
let SNAKE_WIDTH = BLOCK_SIZE - 4;

let appleTypes = ['big', 'speed', 'slow', 'minimize'];

class Game {
    constructor() {
    }


    createSpecialApple(player, callback) {
        let type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
        let pos = this.createApple(player);
        callback({type: type, x: pos.x, y: pos.y});
        console.log(type);
    }

    createSpecialApple2(player1, player2, callback) {
        let type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
        let pos = this.createApple2(player1, player2);
        callback({type: type, x: pos.x, y: pos.y});
        console.log(type);
    }

    createApple(trail) {
        // create an apple on a random tile until it doesn't overlap player
        let x, y;
        do {
            x = Math.floor(Math.random() * hSize);
            y = Math.floor(Math.random() * vSize);
        } while (!this.check(x, y, trail));
        return {x: x, y: y};
    }

    createApple2(trail1, trail2) {
        let x, y;
        do {
            x = Math.floor(Math.random() * hSize);
            y = Math.floor(Math.random() * vSize);
        } while (!this.check2(x, y, trail1, trail2));
        return {x: x, y: y};
    }

    check(x, y, trail) {
        for (let block of trail) {
            if (block.x === x && block.y === y)
                return false;
        }
        return true;
    }

    check2(x, y, trail1, trail2) {
        return this.check(x, y, trail1) && this.check(x, y, trail2);
    }

    drawPlayer(ctx, trail, color) {
        ctx.fillStyle = color;
        // ctx.fillRect(left, top, right, bottom)
        trail.forEach(el => ctx.fillRect(10 + el.x * BLOCK_SIZE + 2, 40 + el.y * BLOCK_SIZE + 2, SNAKE_WIDTH, SNAKE_WIDTH));
    }

    invertedDrawPlayer(ctx, trail, color) {
        ctx.fillStyle = color;
        // ctx.fillRect(left, top, right, bottom)
        // trail.forEach(el => ctx.fillRect(10 + el.y * BLOCK_SIZE + 2, 40 + el.x * BLOCK_SIZE + 2, 11, 11));
        trail.forEach(el =>
            ctx.fillRect(10 + el.y * BLOCK_SIZE + 2, 40 + el.x * BLOCK_SIZE + 2, BLOCK_SIZE_H, BLOCK_SIZE_V));
    }

    invertedCheck(x, y, trail) {
        for (let block of trail) {
            if (block.x === x && block.y === y)
                return false;
        }
        return true;
    }

    invertedCreateApple(trail) {
        // create an apple on a random tile until it doesn't overlap player
        let x, y;
        do {
            x = Math.floor(Math.random() * hSize);
            y = Math.floor(Math.random() * vSize);
        } while (!this.invertedCheck(x, y, trail));
        return {x: x, y: y};
    }

    invertedCreateSpecialApple(player, callback) {
        let type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
        let pos = this.invertedCreateApple(player);
        callback({type: type, x: pos.x, y: pos.y});
        console.log(type);
    }

    addHighScore(score, name) {
        HighScores.push({score: score, name: name});
        HighScores.sort((a, b) => a.score - b.score);
        if (HighScores.length > 10) {
            HighScores.pop();
        }
        console.log(HighScores);
    }

    add2playerHighScore(score, name) {
        TwoPlayerHighScores.push({score: score, name: name});
        TwoPlayerHighScores.sort((a, b) => a.score - b.score);
        if (TwoPlayerHighScores.length > 10) {
            TwoPlayerHighScores.pop();
        }
        console.log(TwoPlayerHighScores);
    }

}