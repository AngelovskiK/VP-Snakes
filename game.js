var HighScores = [];
var TwoPlayerHighScores = [];
var isPaused;
var WIDTH = 640;
var HEIGHT = 480;
// let hSize = 40;
// let vSize = 28;
var hSize = 12;
var vSize = 8;
var BLOCK_SIZE = (640 - hSize) / hSize;
var BLOCK_SIZE_H = (WIDTH) / hSize;
var BLOCK_SIZE_V = (HEIGHT) / vSize;
var SNAKE_WIDTH = BLOCK_SIZE - 4;
var appleTypes = ['big', 'speed', 'slow', 'minimize'];
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.createSpecialApple = function (player, callback) {
        var type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
        var pos = this.createApple(player);
        callback({ type: type, x: pos.x, y: pos.y });
        console.log(type);
    };
    Game.prototype.createSpecialApple2 = function (player1, player2, callback) {
        var type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
        var pos = this.createApple2(player1, player2);
        callback({ type: type, x: pos.x, y: pos.y });
        console.log(type);
    };
    Game.prototype.createApple = function (trail) {
        // create an apple on a random tile until it doesn't overlap player
        var x, y;
        do {
            x = Math.floor(Math.random() * hSize);
            y = Math.floor(Math.random() * vSize);
        } while (!this.check(x, y, trail));
        return { x: x, y: y };
    };
    Game.prototype.createApple2 = function (trail1, trail2) {
        var x, y;
        do {
            x = Math.floor(Math.random() * hSize);
            y = Math.floor(Math.random() * vSize);
        } while (!this.check2(x, y, trail1, trail2));
        return { x: x, y: y };
    };
    Game.prototype.check = function (x, y, trail) {
        for (var _i = 0, trail_1 = trail; _i < trail_1.length; _i++) {
            var block = trail_1[_i];
            if (block.x === x && block.y === y)
                return false;
        }
        return true;
    };
    Game.prototype.check2 = function (x, y, trail1, trail2) {
        return this.check(x, y, trail1) && this.check(x, y, trail2);
    };
    Game.prototype.drawPlayer = function (ctx, trail, color) {
        ctx.fillStyle = color;
        // ctx.fillRect(left, top, right, bottom)
        trail.forEach(function (el) { return ctx.fillRect(10 + el.x * BLOCK_SIZE + 2, 40 + el.y * BLOCK_SIZE + 2, SNAKE_WIDTH, SNAKE_WIDTH); });
    };
    Game.prototype.invertedDrawPlayer = function (ctx, trail, color) {
        ctx.fillStyle = color;
        // ctx.fillRect(left, top, right, bottom)
        // trail.forEach(el => ctx.fillRect(10 + el.y * BLOCK_SIZE + 2, 40 + el.x * BLOCK_SIZE + 2, 11, 11));
        trail.forEach(function (el) {
            return ctx.fillRect(10 + el.y * BLOCK_SIZE + 2, 40 + el.x * BLOCK_SIZE + 2, BLOCK_SIZE_H, BLOCK_SIZE_V);
        });
    };
    Game.prototype.invertedCheck = function (x, y, trail) {
        for (var _i = 0, trail_2 = trail; _i < trail_2.length; _i++) {
            var block = trail_2[_i];
            if (block.x === x && block.y === y)
                return false;
        }
        return true;
    };
    Game.prototype.invertedCreateApple = function (trail) {
        // create an apple on a random tile until it doesn't overlap player
        var x, y;
        do {
            x = Math.floor(Math.random() * hSize);
            y = Math.floor(Math.random() * vSize);
        } while (!this.invertedCheck(x, y, trail));
        return { x: x, y: y };
    };
    Game.prototype.invertedCreateSpecialApple = function (player, callback) {
        var type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
        var pos = this.invertedCreateApple(player);
        callback({ type: type, x: pos.x, y: pos.y });
        console.log(type);
    };
    Game.prototype.addHighScore = function (score, name) {
        HighScores.push({ score: score, name: name });
        HighScores.sort(function (a, b) { return a.score - b.score; });
        if (HighScores.length > 10) {
            HighScores.pop();
        }
        console.log(HighScores);
    };
    Game.prototype.add2playerHighScore = function (score, name) {
        TwoPlayerHighScores.push({ score: score, name: name });
        TwoPlayerHighScores.sort(function (a, b) { return a.score - b.score; });
        if (TwoPlayerHighScores.length > 10) {
            TwoPlayerHighScores.pop();
        }
        console.log(TwoPlayerHighScores);
    };
    return Game;
}());
//# sourceMappingURL=game.js.map