class Board {
    container: any;

    width: number;
    height: number;

    hSize: number;
    vSize: number;

    menu: Menu;
    traversal: Traversal;
    canvas: any;

    btnQuit: any;

    block_size: number;
    ten_percent: number;

    FOOD_COLOR: string;

    food_exists: boolean;
    food_point: Point;

    isPaused: boolean;
    cycle: any;

    type_of_ai: number;

    constructor(container, width, height, difficulty, type_of_ai) {
        this.container = container;
        this.width = width;
        this.height = height;

        let common_divisor = this.common_divisors(width, height).reverse();
        this.block_size = common_divisor[difficulty];
        console.log(this.common_divisors(width, height));
        console.log("this.block_size", this.block_size);

        let block_size_float: number = parseFloat(this.block_size.toString());
        this.ten_percent = (block_size_float * 0.01);
        console.log(this.ten_percent);

        this.vSize = this.width / this.block_size;
        this.hSize = this.height / this.block_size;

        this.menu = new Menu();
        this.traversal = new Traversal();

        this.FOOD_COLOR = "red";
        this.food_exists = false;
        this.food_point = new Point(5, 5);

        this.isPaused = false;
        this.type_of_ai = type_of_ai;
    }

    gcd(a, b) {
        return (b === 0) ? a : this.gcd(b, a % b);
    }

    common_divisors(a: number, b: number): Array<number> {
        let result: Array<number> = [];
        let min: number = Math.min(a, b);
        for (let i = 1; i < min; i += 1) {
            if (a % i === 0 && b % i === 0) {
                result.push(i);
            }
        }
        return result;
    }

    LCM(A) {
        var n = A.length, a = Math.abs(A[0]);
        for (var i = 1; i < n; i++) {
            var b = Math.abs(A[i]), c = a;
            while (a && b) {
                a > b ? a %= b : b %= a;
            }
            a = Math.abs(c * A[i]) / (a + b);
        }
        return a;
    }

    startSinglePlayer() {
        this.erase();
        this.addBackToMenuButton();

        let ctx = this.canvas.getContext("2d");
        ctx.font = "22px Arial";

        this.draw(ctx);

        let snake: Snake = new Snake(2, 2, Direction.Right, "blue", this.vSize, this.hSize, this.type_of_ai);

        let direction: Direction = Direction.Right;
        document.addEventListener("keydown", (e) => {
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
                        clearInterval(this.cycle);
                    }
                    else {
                        this.cycle = setInterval(() =>
                            this.animate(ctx, "human", direction, snake, interval, this.container, this.menu, this.cycle), interval);
                    }
                    break;
            }
        });

        let interval: number = 60;
        // this uses a lambda wrapper function
        this.cycle = setInterval(() => this.animate(ctx, "human", direction, snake, interval, this.container, this.menu, this.cycle), interval);
    }

    start() {
        this.erase();
        this.addBackToMenuButton();

        let ctx = this.canvas.getContext("2d");
        ctx.font = "22px Arial";

        this.draw(ctx);

        let snake: Snake = new Snake(2, 2, Direction.Right, "blue", this.vSize, this.hSize, this.type_of_ai);

        document.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                // Letter P key
                case 80:
                    isPaused = !isPaused;
                    if (isPaused) {
                        clearInterval(this.cycle);
                    } else {
                        this.cycle = setInterval(() =>
                            this.animate(ctx, "ai_snake", Direction.Right, snake, interval, this.container, this.menu, this.cycle), interval);
                    }
                    break;
            }
        });

        let interval: number = 60;
        // this uses a lambda wrapper function
        this.cycle = setInterval(() => this.animate(ctx, "ai_snake", Direction.Right, snake, interval, this.container, this.menu, this.cycle), interval);
    }

    animate(ctx, playerType, direction, snake: Snake, interval, container, menu, cycle) {
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
            } else {
                // ai_snake
                if (snake.trail.length === snake.length) {
                    snake.head = snake.get_next_move(this.food_point);
                } else {
                    snake.head = snake.move(direction);
                }
            }

            if (snake.head.equals(this.food_point)) {
                snake.length += 1;
                this.food_point = this.getRandomPointNotInList(snake.trail);
            }
        } else {
            // get name
            this.getName(this.canvas, ctx, "Enter player's name: ",
                function (name) {
                    menu.ShowMenu(container);
                    clearInterval(cycle);
                });

        }
        ctx.fillText("Player 1 - Length: " + snake.length + " Speed: " + interval, this.block_size, this.block_size);
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < this.vSize; i++) {
            for (let j = 0; j < this.hSize; j++) {

                if (i === 0 && j === 0) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(i * this.block_size, j * this.block_size, this.block_size, this.block_size);
                } else {
                    ctx.fillStyle = "gray";
                    ctx.fillRect(i * this.block_size, j * this.block_size, this.block_size, this.block_size);
                }

                ctx.fillStyle = "white";
                ctx.fillRect(i * this.block_size + this.ten_percent, j * this.block_size + this.ten_percent, this.block_size - 2 * this.ten_percent, this.block_size - 2 * this.ten_percent);
            }
        }
    }

    drawFood(ctx, point: Point, color: string) {
        ctx.fillStyle = color;
        ctx.fillRect(point.y * this.block_size + this.ten_percent, point.x * this.block_size + this.ten_percent, this.block_size - 2 * this.ten_percent, this.block_size - 2 * this.ten_percent);
    }

    getRandomPointNotInList(obstacles: Array<Point>): Point {
        // create an apple on a random tile until it doesn't overlap player
        let x, y;
        let point: Point = null;
        do {
            x = Math.floor(Math.random() * hSize);
            y = Math.floor(Math.random() * vSize);
            point = new Point(x, y);
        } while (Point.isInList(point, obstacles));
        return point;
    }

    erase() {
        this.container.innerHTML = "";
        let canvas = document.createElement("canvas");
        canvas.setAttribute('width', this.width.toString());
        canvas.setAttribute('height', this.height.toString());
        canvas.id = 'game';
        this.canvas = canvas;
        this.container.appendChild(canvas);
    }

    addBackToMenuButton() {
        let quitButton = document.createElement("button");
        quitButton.className = 'quit';
        quitButton.appendChild(document.createTextNode("✖"));
        quitButton.addEventListener("click", () => this.menu.ShowMenu(this.container));
        this.btnQuit = quitButton;
        this.container.appendChild(quitButton);
    }

    getName(canvas, ctx, text, cb) {
        //setup screen
        let name = '';

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
                console.log(name);
                cb(name);
                document.removeEventListener("keyup", listenToName, true);
            }
            //refresh name dialog
            ctx.fillStyle = 'black';
            ctx.fillRect(100, 180, 440, 60);

            ctx.fillStyle = 'white';
            ctx.fillText(text + name, 110, 210);
        }
    }
}