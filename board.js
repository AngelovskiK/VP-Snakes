var Board = /** @class */ (function () {
    function Board(container, width, height, type) {
        this.container = container;
        this.width = width;
        this.height = height;
        var common_divisor = this.common_divisors(width, height).reverse();
        switch (type) {
            // easy
            case 0: {
                this.block_size = common_divisor[1];
                break;
            }
            case 1: {
                this.block_size = common_divisor[2];
                break;
            }
            case 2: {
                this.block_size = common_divisor[3];
                break;
            }
        }
        console.log(this.common_divisors(width, height));
        var block_size_float = parseFloat(this.block_size.toString());
        this.ten_percent = (block_size_float * 0.01);
        console.log(this.ten_percent);
        this.vSize = this.width / this.block_size;
        this.hSize = this.height / this.block_size;
        this.menu = new Menu();
        this.traversal = new Traversal();
        this.FOOD_COLOR = "red";
        this.food_exists = false;
        this.food_point = new Point(0, 1);
        this.isPaused = false;
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
        var snake = new Snake(2, 2, Direction.Right, "blue", this.vSize, this.hSize);
        var direction = Direction.Right;
        document.addEventListener("keydown", function (e) {
            //handle direction changes and pauses
            switch (e.keyCode) {
                //left
                case 37:
                    direction = Direction.Left;
                    break;
                //up
                case 38:
                    direction = Direction.Up;
                    break;
                //right
                case 39:
                    direction = Direction.Right;
                    break;
                //down
                case 40:
                    direction = Direction.Down;
                    break;
                //pause
                case 80:
                    isPaused = !isPaused;
                    if (isPaused) {
                        clearInterval(cycle);
                    }
                    else {
                        cycle = setInterval(function () {
                            return _this.animate(ctx, "human", direction, snake, interval);
                        }, interval);
                    }
                    break;
            }
        });
        var interval = 60;
        // this uses a lambda wrapper function
        var cycle = setInterval(function () { return _this.animate(ctx, "human", direction, snake, interval); }, interval);
    };
    Board.prototype.start = function () {
        var _this = this;
        this.erase();
        this.addBackToMenuButton();
        var ctx = this.canvas.getContext("2d");
        ctx.font = "22px Arial";
        this.draw(ctx);
        var snake = new Snake(2, 2, Direction.Right, "blue", this.vSize, this.hSize);
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                // Letter P key
                case 80:
                    isPaused = !isPaused;
                    if (isPaused) {
                        clearInterval(cycle);
                    }
                    else {
                        cycle = setInterval(function () {
                            return _this.animate(ctx, "ai_snake", Direction.Right, snake, interval);
                        }, interval);
                    }
                    break;
            }
        });
        var interval = 60;
        // this uses a lambda wrapper function
        var cycle = setInterval(function () { return _this.animate(ctx, "ai_snake", Direction.Right, snake, interval); }, interval);
    };
    Board.prototype.animate = function (ctx, playerType, direction, snake, interval) {
        this.draw(ctx);
        if (!Point.isInList(snake.head, snake.trail)) {
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
                    snake.head = snake.get_next_move_other(this.food_point);
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
        ctx.fillText("Player 1 - Length: " + snake.length + " Speed: " + interval, this.block_size, this.block_size);
    };
    Board.prototype.draw = function (ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
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
            x = Math.floor(Math.random() * hSize);
            y = Math.floor(Math.random() * vSize);
            point = new Point(x, y);
        } while (Point.isInList(point, obstacles));
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
    return Board;
}());
//# sourceMappingURL=board.js.map