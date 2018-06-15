"use strict";
exports.__esModule = true;
var point_1 = require("./point");
var menu_1 = require("./menu");
var traversal_1 = require("./traversal");
var jquery_1 = require("./node_modules/jquery");
var snake_1 = require("./snake");
var problem_1 = require("./problem");
var Board = /** @class */ (function () {
    function Board(container, width, height, difficulty, type_of_ai) {
        this.container = container;
        this.width = width;
        this.height = height;
        var common_divisor = this.common_divisors(width, height).reverse();
        this.block_size = common_divisor[difficulty];
        console.log(this.common_divisors(width, height));
        console.log("this.block_size", this.block_size);
        var block_size_float = parseFloat(this.block_size.toString());
        this.ten_percent = (block_size_float * 0.01);
        console.log(this.ten_percent);
        this.vSize = this.width / this.block_size;
        this.hSize = this.height / this.block_size;
        this.menu = new menu_1.Menu();
        this.traversal = new traversal_1.Traversal();
        this.FOOD_COLOR = "red";
        this.food_exists = false;
        this.food_point = new point_1.Point(5, 5);
        this.isPaused = false;
        this.type_of_ai = type_of_ai;
    }
    Board.prototype.gcd = function (a, b) {
        return (b === 0) ? a : this.gcd(b, a % b);
    };
    Board.prototype.common_divisors = function (a, b) {
        var result = [];
        var min = Math.min(a, b);
        for (var i = 1; i < min; i += 1) {
            if (a % i === 0 && b % i === 0) {
                result.push(i);
            }
        }
        return result;
    };
    Board.prototype.LCM = function (A) {
        var n = A.length, a = Math.abs(A[0]);
        for (var i = 1; i < n; i++) {
            var b = Math.abs(A[i]), c = a;
            while (a && b) {
                a > b ? a %= b : b %= a;
            }
            a = Math.abs(c * A[i]) / (a + b);
        }
        return a;
    };
    Board.prototype.startSinglePlayer = function () {
        var _this = this;
        this.erase();
        this.addBackToMenuButton();
        var ctx = this.canvas.getContext("2d");
        ctx.font = "22px Arial";
        this.draw(ctx);
        var snake = new snake_1.Snake(2, 2, problem_1.Direction.Right, "blue", this.vSize, this.hSize, this.type_of_ai);
        var direction = problem_1.Direction.Right;
        document.addEventListener("keydown", function (e) {
            //handle direction changes and pauses
            switch (e.keyCode) {
                //left
                case 37:
                    direction = problem_1.Direction.Left;
                    break;
                //up
                case 38:
                    direction = problem_1.Direction.Up;
                    break;
                //right
                case 39:
                    direction = problem_1.Direction.Right;
                    break;
                //down
                case 40:
                    direction = problem_1.Direction.Down;
                    break;
                //pause
                case 80:
                    _this.isPaused = !_this.isPaused;
                    if (_this.isPaused) {
                        clearInterval(_this.cycle);
                    }
                    else {
                        _this.cycle = setInterval(function () {
                            return _this.animate(ctx, "human", direction, snake, interval, _this.container, _this.menu, _this.cycle);
                        }, interval);
                    }
                    break;
            }
        });
        var interval = 60;
        // this uses a lambda wrapper function
        this.cycle = setInterval(function () { return _this.animate(ctx, "human", direction, snake, interval, _this.container, _this.menu, _this.cycle); }, interval);
    };
    Board.prototype.startMultiPlayer = function () {
    };
    Board.prototype.start = function () {
        var _this = this;
        this.erase();
        this.addBackToMenuButton();
        var ctx = this.canvas.getContext("2d");
        ctx.font = "22px Arial";
        this.draw(ctx);
        var snake = new snake_1.Snake(2, 2, problem_1.Direction.Right, "blue", this.vSize, this.hSize, this.type_of_ai);
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                // Letter P key
                case 80:
                    _this.isPaused = !_this.isPaused;
                    if (_this.isPaused) {
                        clearInterval(_this.cycle);
                    }
                    else {
                        _this.cycle = setInterval(function () {
                            return _this.animate(ctx, "ai_snake", problem_1.Direction.Right, snake, interval, _this.container, _this.menu, _this.cycle);
                        }, interval);
                    }
                    break;
            }
        });
        var interval = 60;
        // this uses a lambda wrapper function
        this.cycle = setInterval(function () { return _this.animate(ctx, "ai_snake", problem_1.Direction.Right, snake, interval, _this.container, _this.menu, _this.cycle); }, interval);
    };
    Board.prototype.animate = function (ctx, playerType, direction, snake, interval, container, menu, cycle) {
        this.draw(ctx);
        if (!point_1.Point.isInList(snake.head, snake.trail)) {
            snake.trail.push(snake.head);
            while (snake.trail.length > snake.length) {
                snake.trail.shift();
            }
            snake.draw(ctx, this.block_size, this.ten_percent);
            this.drawFood(ctx, this.food_point, this.FOOD_COLOR);
            if (playerType === "human") {
                snake.head = snake.move(direction);
            }
            else {
                // ai_snake
                if (snake.trail.length === snake.length) {
                    snake.head = snake.get_next_move(this.food_point);
                }
                else {
                    snake.head = snake.move(direction);
                }
            }
            if (snake.head.equals(this.food_point)) {
                snake.length += 1;
                this.food_point = this.getRandomPointNotInList(snake.trail);
            }
        }
        else {
            // get name
            clearInterval(cycle);
            this.getName(this.canvas, ctx, "Enter player's name: ", function (name) {
                menu.ShowMenu(container);
                jquery_1.ajax({
                    url: 'https://asocial-setting.000webhostapp.com/scores.php',
                    data: {
                        type: 'sp', name: name, score: snake.length
                    },
                    type: 'post',
                    dataType: 'json',
                    success: function (result) {
                        console.log(result);
                    }
                });
                console.log(name);
            });
        }
        ctx.fillText("Player 1 - Length: " + snake.length + " Speed: " + interval, this.block_size, this.block_size);
    };
    Board.prototype.draw = function (ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.width, this.height);
        for (var i = 0; i < this.vSize; i++) {
            for (var j = 0; j < this.hSize; j++) {
                if (i === 0 && j === 0) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(i * this.block_size, j * this.block_size, this.block_size, this.block_size);
                }
                else {
                    ctx.fillStyle = "gray";
                    ctx.fillRect(i * this.block_size, j * this.block_size, this.block_size, this.block_size);
                }
                ctx.fillStyle = "white";
                ctx.fillRect(i * this.block_size + this.ten_percent, j * this.block_size + this.ten_percent, this.block_size - 2 * this.ten_percent, this.block_size - 2 * this.ten_percent);
            }
        }
    };
    Board.prototype.drawFood = function (ctx, point, color) {
        ctx.fillStyle = color;
        ctx.fillRect(point.y * this.block_size + this.ten_percent, point.x * this.block_size + this.ten_percent, this.block_size - 2 * this.ten_percent, this.block_size - 2 * this.ten_percent);
    };
    Board.prototype.getRandomPointNotInList = function (obstacles) {
        // create an apple on a random tile until it doesn't overlap player
        var x, y;
        var point = null;
        do {
            x = Math.floor(Math.random() * this.hSize);
            y = Math.floor(Math.random() * this.vSize);
            point = new point_1.Point(x, y);
        } while (point_1.Point.isInList(point, obstacles));
        return point;
    };
    Board.prototype.erase = function () {
        this.container.innerHTML = "";
        var canvas = document.createElement("canvas");
        canvas.setAttribute('width', this.width.toString());
        canvas.setAttribute('height', this.height.toString());
        canvas.id = 'game';
        this.canvas = canvas;
        this.container.appendChild(canvas);
    };
    Board.prototype.addBackToMenuButton = function () {
        var _this = this;
        var quitButton = document.createElement("button");
        quitButton.className = 'quit';
        quitButton.appendChild(document.createTextNode("✖"));
        quitButton.addEventListener("click", function () { return _this.menu.ShowMenu(_this.container); });
        this.btnQuit = quitButton;
        this.container.appendChild(quitButton);
    };
    Board.prototype.getName = function (canvas, ctx, text, cb) {
        //setup screen
        var name = '';
        ctx.fillStyle = 'white';
        ctx.fillRect(100, 180, 440, 60);
        ctx.fillStyle = 'black';
        ctx.fillText(text + name, 110, 210);
        //listen to keystrokes
        document.addEventListener("keyup", listenToName, true);
        function listenToName(e) {
            // if character or number add to name, if backspace shorten last char, if enter
            // callback function and remove this event listener
            if (e.key.length == 1 && e.key.match(/[a-z0-9]/i))
                name += e.key;
            else if (e.key == 'Backspace')
                name = name.slice(0, -1);
            else if (e.key == 'Enter') {
                cb(name);
                document.removeEventListener("keyup", listenToName, true);
            }
            //refresh name dialog
            ctx.fillStyle = 'black';
            ctx.fillRect(100, 180, 440, 60);
            ctx.fillStyle = 'white';
            ctx.fillText(text + name, 110, 210);
        }
    };
    return Board;
}());
exports.Board = Board;
