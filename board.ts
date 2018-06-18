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

    SNAKE_COLOR: string;
    SNAKE_TWO_COLOR: string;
    FOOD_COLOR: string;
    SPECIAL_FOOD_COLOR: string;
    BLOCK_COLOR: string;
    BOTTOM_COLOR: string;

    food_exists: boolean;
    food_point: Point;
    special_food_point: Point;
    special_food_type: String;
    special_food_types: String[];

    isPaused: boolean;
    cycle: number;

    type_of_ai: number;

    // new code
    interval: number;
    milis: number;
    difficulty: number;

    // end of new code

    constructor(container, width, height, difficulty, type_of_ai) {
        this.container = container;
        this.width = width;
        this.height = height;

        this.difficulty = difficulty;
        console.log(this.difficulty);

        let common_divisor = this.common_divisors(width, height).reverse();
        this.block_size = common_divisor[difficulty + 1];
        console.log(this.common_divisors(width, height));
        console.log("this.block_size", this.block_size);

        let block_size_float: number = parseFloat(this.block_size.toString());
        this.ten_percent = (block_size_float * 0.01);
        console.log(this.ten_percent);

        this.vSize = this.width / this.block_size;
        this.hSize = this.height / this.block_size;

        this.menu = new Menu();
        this.traversal = new Traversal();

        this.SNAKE_COLOR = "blue";
        this.SNAKE_TWO_COLOR = "purple";
        this.FOOD_COLOR = "red";
        this.SPECIAL_FOOD_COLOR = "Fuchsia";
        this.food_exists = false;
        this.special_food_types = ["big", "small", "color"];
        this.BLOCK_COLOR = "white";
        this.BOTTOM_COLOR = "gray";

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
        this.milis = 0;
        this.erase();
        this.addBackToMenuButton();

        let ctx = this.canvas.getContext("2d");
        ctx.font = "22px Arial";

        this.draw(ctx);

        let snake: Snake = new Snake(2, 2, Direction.Right, this.SNAKE_COLOR, this.vSize, this.hSize, this.type_of_ai);

        // new code
        this.food_exists = true;
        this.food_point = this.getRandomPointNotInList(snake.trail);
        snake.trail.push(this.food_point);
        this.special_food_point = this.getRandomPointNotInList(snake.trail);
        this.special_food_type = this.special_food_types[Math.floor(Math.random() * (this.special_food_types.length))];
        snake.trail.pop();
        // end of new code

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
                        ctx.fillStyle = "black";
                        let x = Math.round((this.width / 2) - 100);
                        let y = Math.round((this.height / 2));
                        ctx.fillText("Press 'p' to unpause", x, y);
                    }
                    else {
                        this.cycle = setInterval(() =>
                            this.animate(ctx, "human", direction, snake, interval, this.container, this.menu), interval);
                        // this.cycle = setInterval(() => this.animate(ctx, "human", direction, snake, this.interval, this.container, this.menu), this.interval);
                    }
                    break;
            }
        });

        let interval: number = 60;
        // // this uses a lambda wrapper function
        // this.cycle = setInterval(() => this.animate(ctx, "human", direction, snake, interval, this.container, this.menu), interval);

        this.interval = 60;
        this.cycle = setInterval(() => this.animate(ctx, "human", direction, snake, this.interval, this.container, this.menu), this.interval);
    }

    startMultiPlayer() {
        this.milis = 0;
        this.erase();
        this.addBackToMenuButton();

        let ctx = this.canvas.getContext("2d");
        ctx.font = "22px Arial";

        this.draw(ctx);

        let snakeOne: Snake = new Snake(2, 2, Direction.Right, this.SNAKE_COLOR, this.vSize, this.hSize, this.type_of_ai);

        let snakeTwo: Snake = new Snake(4, 4, Direction.Left, this.SNAKE_TWO_COLOR, this.vSize, this.hSize, this.type_of_ai);

        // new code
        this.food_exists = true;
        this.food_point = this.getRandomPointNotInList([...snakeOne.trail, ...snakeTwo.trail]);
        this.special_food_point = this.getRandomPointNotInList([this.food_point, ...snakeOne.trail, ...snakeTwo.trail]);
        this.special_food_type = this.special_food_types[Math.floor(Math.random() * (this.special_food_types.length))];
        // end of new code

        let directionOne: Direction = Direction.Right;
        let directionTwo: Direction = Direction.Right;
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowLeft" : {
                    directionOne = Direction.Left;
                    break;
                }
                case "ArrowUp": {
                    directionOne = Direction.Up;
                    break;
                }
                case "ArrowRight": {
                    directionOne = Direction.Right;
                    break;
                }
                case "ArrowDown": {
                    directionOne = Direction.Down;
                    break;
                }
                case "a" : {
                    directionTwo = Direction.Left;
                    break;
                }
                case "w": {
                    directionTwo = Direction.Up;
                    break;
                }
                case "d": {
                    directionTwo = Direction.Right;
                    break;
                }
                case "s": {
                    directionTwo = Direction.Down;
                    break;
                }
                case "p": {
                    console.log(e);
                    isPaused = !isPaused;
                    if (isPaused) {
                        clearInterval(this.cycle);
                        ctx.fillStyle = "black";
                        let x = Math.round((this.width / 2) - 100);
                        let y = Math.round((this.height / 2));
                        ctx.fillText("Press 'p' to unpause", x, y);
                    } else {
                        // this.cycle = setInterval(() =>
                        //     this.animateTwoPlayer(ctx, "human", directionOne, directionTwo, snakeOne, snakeTwo, interval, this.container, this.menu), interval);
                        this.cycle = setInterval(() =>
                            this.animateTwoPlayer(ctx, "human", directionOne, directionTwo, snakeOne, snakeTwo, interval, this.container, this.menu), interval);
                    }
                    break;
                }
            }
        });

        this.interval = 60;
        let interval: number = 60;
        // this uses a lambda wrapper function
        // this.cycle = setInterval(() =>
        //     this.animateTwoPlayer(ctx, "human", directionOne, directionTwo, snakeOne, snakeTwo, interval, this.container, this.menu), interval);
        this.cycle = setInterval(() =>
            this.animateTwoPlayer(ctx, "human", directionOne, directionTwo, snakeOne, snakeTwo, this.interval, this.container, this.menu), this.interval);
    }

    start() {
        this.milis = 0;
        this.erase();
        this.addBackToMenuButton();

        let ctx = this.canvas.getContext("2d");
        ctx.font = "22px Arial";

        this.draw(ctx);

        let snake: Snake = new Snake(2, 2, Direction.Right, this.SNAKE_COLOR, this.vSize, this.hSize, this.type_of_ai);

        // new code
        this.food_exists = true;
        this.food_point = this.getRandomPointNotInList(snake.trail);
        snake.trail.push(this.food_point);
        this.special_food_point = this.getRandomPointNotInList(snake.trail);
        this.special_food_type = this.special_food_types[Math.floor(Math.random() * (this.special_food_types.length))];
        snake.trail.pop();
        // end of new code

        document.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                // Letter P key
                case 80:
                    isPaused = !isPaused;
                    if (isPaused) {
                        clearInterval(this.cycle);
                        ctx.fillStyle = "black";
                        let x = Math.round((this.width / 2) - 100);
                        let y = Math.round((this.height / 2));
                        ctx.fillText("Press 'p' to unpause", x, y);
                    } else {
                        this.cycle = setInterval(() =>
                            this.animate(ctx, "ai_snake", Direction.Right, snake, interval, this.container, this.menu), interval);
                    }
                    break;
            }
        });

        let interval: number = 60;
        this.interval = 60;
        this.has_point = false;
        this.chosen_point = this.food_point;
        // this uses a lambda wrapper function
        this.cycle = setInterval(() => this.animate(ctx, "ai_snake", Direction.Right, snake, this.interval, this.container, this.menu), this.interval);
        console.log("this.cycle: ", this.cycle);
    }

    startMultiPlayerWithAI() {
        this.milis = 0;
        this.erase();
        this.addBackToMenuButton();

        let ctx = this.canvas.getContext("2d");
        ctx.font = "22px Arial";

        this.draw(ctx);

        let snakeOne: Snake = new Snake(2, 2, Direction.Right, this.SNAKE_COLOR, this.vSize, this.hSize, this.type_of_ai);

        let snakeTwo: Snake = new Snake(4, 4, Direction.Left, this.SNAKE_TWO_COLOR, this.vSize, this.hSize, this.type_of_ai);

        // new code
        this.food_exists = true;
        this.food_point = this.getRandomPointNotInList([...snakeOne.trail, ...snakeTwo.trail]);
        this.special_food_point = this.getRandomPointNotInList([this.food_point, ...snakeOne.trail, ...snakeTwo.trail]);
        this.special_food_type = this.special_food_types[Math.floor(Math.random() * (this.special_food_types.length))];
        // end of new code

        let directionOne: Direction = Direction.Right;
        let directionTwo: Direction = Direction.Right;
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowLeft" : {
                    directionOne = Direction.Left;
                    break;
                }
                case "ArrowUp": {
                    directionOne = Direction.Up;
                    break;
                }
                case "ArrowRight": {
                    directionOne = Direction.Right;
                    break;
                }
                case "ArrowDown": {
                    directionOne = Direction.Down;
                    break;
                }
                case "a" : {
                    directionTwo = Direction.Left;
                    break;
                }
                case "w": {
                    directionTwo = Direction.Up;
                    break;
                }
                case "d": {
                    directionTwo = Direction.Right;
                    break;
                }
                case "s": {
                    directionTwo = Direction.Down;
                    break;
                }
                case "p": {
                    isPaused = !isPaused;
                    if (isPaused) {
                        clearInterval(this.cycle);
                        ctx.fillStyle = "black";
                        let x = Math.round((this.width / 2) - 100);
                        let y = Math.round((this.height / 2));
                        ctx.fillText("Press 'p' to unpause", x, y);
                    } else {
                        this.cycle = setInterval(() =>
                            this.animateTwoPlayer(ctx, "human", directionOne, directionTwo, snakeOne, snakeTwo, interval, this.container, this.menu), interval);
                    }
                    break;
                }
            }
        });

        let interval: number = 60;
        // this uses a lambda wrapper function
        this.cycle = setInterval(() =>
            this.animateTwoPlayer(ctx, "ai_snake", directionOne, directionTwo, snakeOne, snakeTwo, interval, this.container, this.menu), interval);

    }

    has_point: boolean = false;
    chosen_point: Point;


    animate(ctx, playerType, direction, snake: Snake, interval, container, menu) {
        this.draw(ctx);
        this.milis += interval;

        if (!Point.isInList(snake.head, snake.trail)) {
            snake.trail.push(snake.head);
            while (snake.trail.length > snake.length) {
                snake.trail.shift();
            }

            snake.draw(ctx, this.block_size, this.ten_percent);
            this.drawFood(ctx, this.food_point, this.FOOD_COLOR);
            // new code
            this.drawFood(ctx, this.special_food_point, this.SPECIAL_FOOD_COLOR);
            // end of new code

            if (playerType === "human") {
                snake.head = snake.move(direction);
            } else {
                // ai_snake
                if (snake.trail.length === snake.length) {

                    // new code
                    // console.log("this.has_point", this.has_point);
                    // console.log("this.chosen_point", this.chosen_point);
                    // if (this.has_point === false) {
                    //     if (Problem.manhattan_distance(snake.head, this.special_food_point) > Problem.manhattan_distance(snake.head, this.food_point)) {
                    //         this.chosen_point = this.special_food_point;
                    //     } else {
                    //         this.chosen_point = this.food_point;
                    //     }
                    //     this.has_point = true;
                    // }
                    // console.log("this.chosen_point", this.chosen_point);

                    snake.head = snake.get_next_move(this.food_point);
                    // end of new code
                } else {
                    snake.head = snake.move(direction);
                }
            }

            if (snake.head.equals(this.food_point)) {
                // this.has_point = false;
                this.food_point = this.getRandomPointNotInList(snake.trail);
                snake.length += 1;
            }
            // new code
            else if (snake.head.equals(this.special_food_point)) {
                // this.has_point = false;
                this.special_food_point = this.getRandomPointNotInList(snake.trail);
                console.log(this.special_food_type);

                switch (this.special_food_type) {
                    case "big": {
                        snake.length += 2;
                        break;
                    }

                    case "small": {
                        snake.length -= Math.round(snake.length / 10);
                        break;
                    }

                    case "color": {
                        if (this.BLOCK_COLOR === "white") {
                            this.BOTTOM_COLOR = "white";
                            this.BLOCK_COLOR = "black";
                            snake.color = "lime"
                        } else if (this.BLOCK_COLOR === "black") {
                            this.BOTTOM_COLOR = "tomato";
                            this.BLOCK_COLOR = "purple";
                            snake.color = "orange"
                        } else if (this.BLOCK_COLOR === "purple") {
                            this.BOTTOM_COLOR = "pink";
                            this.BLOCK_COLOR = "wheat";
                            snake.color = "whiteSmoke"
                        } else {
                            this.BOTTOM_COLOR = "gray";
                            this.BLOCK_COLOR = "white";
                            snake.color = "blue";
                        }
                        break;
                    }

                    case "fast": {
                        let modified_interval = interval - 10;
                        // console.log("[interval, modified_interval]: ", interval, modified_interval);
                        clearInterval(this.cycle);
                        this.clearAllCycles();
                        setTimeout(() => {
                            this.cycle = setInterval(() => this.animate(ctx, playerType, direction, snake, modified_interval, this.container, this.menu), modified_interval);
                            clearInterval(this.cycle);
                            this.clearAllCycles();
                        }, 5000);
                        this.cycle = setInterval(() => this.animate(ctx, playerType, direction, snake, interval, this.container, this.menu), interval);
                        // console.log("[interval, modified_interval]: ", interval, modified_interval);
                        break;
                    }

                    case "slow": {
                        let modified_interval = interval + 10;
                        // console.log("[interval, modified_interval]: ", interval, modified_interval);
                        clearInterval(this.cycle);
                        this.clearAllCycles();
                        setTimeout(() => {
                            this.cycle = setInterval(() => this.animate(ctx, playerType, direction, snake, modified_interval, this.container, this.menu), modified_interval);
                            clearInterval(this.cycle);
                            this.clearAllCycles();
                        }, 5000);
                        this.cycle = setInterval(() => this.animate(ctx, playerType, direction, snake, interval, this.container, this.menu), interval);
                        // console.log("[interval, modified_interval]: ", interval, modified_interval);
                        break;
                    }

                }

                this.special_food_type = this.special_food_types[Math.floor(Math.random() * (this.special_food_types.length))];

            }
            // end of new code
        } else {
            // get name
            this.clearAllCycles();

            if ($) {
                console.log("jQuery loaded");
            }

            let current_milis = Math.round(this.milis / 1000);
            let current_difficulty = this.difficulty;

            this.getName(this.canvas, ctx, "Enter player's name: ",
                function (name) {
                    let url: string = "https://asocial-setting.000webhostapp.com/scores.php";
                    console.log(name.toString(), snake.length.toString(), current_milis.toString(), current_difficulty);
                    let data = {
                        type: 'sp',
                        name: name.toString(),
                        score: snake.length.toString(),
                        time: current_milis.toString(),
                        difficulty: current_difficulty.toString()
                    };
                    $.post(url, data, (response) => {
                        console.log(response);
                    });

                    console.log(name);
                    menu.ShowMenu(container);
                    location.reload();
                });

        }
        ctx.fillStyle = snake.color;
        ctx.fillText("Player 1 - Length: " + snake.length + " Time: " + Math.floor(this.milis / 1000), this.block_size, this.block_size);
    }

    animateTwoPlayer(ctx, playerType, directionOne, directionTwo, snakeOne: Snake, snakeTwo: Snake, interval, container, menu) {
        this.milis += interval;

        this.draw(ctx);

        if (!Point.areInList([snakeOne.head, snakeTwo.head], [...snakeOne.trail, ...snakeTwo.trail])) {

            snakeOne.trail.push(snakeOne.head);
            snakeTwo.trail.push(snakeTwo.head);
            while (snakeOne.trail.length > snakeOne.length) {
                snakeOne.trail.shift();
            }
            while (snakeTwo.trail.length > snakeTwo.length) {
                snakeTwo.trail.shift();
            }

            snakeOne.draw(ctx, this.block_size, this.ten_percent);
            snakeTwo.draw(ctx, this.block_size, this.ten_percent);

            this.drawFood(ctx, this.food_point, this.FOOD_COLOR);
            // new code
            this.drawFood(ctx, this.special_food_point, this.SPECIAL_FOOD_COLOR);
            // end of new code

            if (playerType === "human") {
                snakeOne.head = snakeOne.move(directionOne);
                snakeTwo.head = snakeTwo.move(directionTwo);
            } else {
                // ai_snake
                snakeOne.head = snakeOne.move(directionOne);
                if (snakeTwo.trail.length === snakeTwo.length) {
                    snakeTwo.head = snakeTwo.get_next_move(this.food_point);
                } else {
                    snakeTwo.head = snakeTwo.move(directionTwo);
                }
            }

            if (snakeOne.head.equals(this.food_point)) {
                this.food_point = this.getRandomPointNotInList([...snakeOne.trail, ...snakeTwo.trail]);
                snakeOne.length += 1;
            } else if (snakeTwo.head.equals(this.food_point)) {
                this.food_point = this.getRandomPointNotInList([...snakeOne.trail, ...snakeTwo.trail]);
                snakeTwo.length += 1;
            }
            // new code
            else if (snakeOne.head.equals(this.special_food_point)) {
                this.special_food_point = this.getRandomPointNotInList([...snakeOne.trail, ...snakeTwo.trail]);
                console.log(this.special_food_type);

                switch (this.special_food_type) {
                    case "big": {
                        snakeOne.length += 2;
                        break;
                    }

                    case "small": {
                        snakeOne.length -= Math.round(snakeOne.length / 10);
                        break;
                    }

                    case "color": {
                        if (this.BLOCK_COLOR === "white") {
                            this.BOTTOM_COLOR = "white";
                            this.BLOCK_COLOR = "black";
                            snakeOne.color = "lime";
                            snakeTwo.color = "aqua";
                        } else if (this.BLOCK_COLOR === "black") {
                            this.BOTTOM_COLOR = "tomato";
                            this.BLOCK_COLOR = "purple";
                            snakeOne.color = "orange";
                            snakeTwo.color = "DeepPink";
                        } else if (this.BLOCK_COLOR === "purple") {
                            this.BOTTOM_COLOR = "pink";
                            this.BLOCK_COLOR = "wheat";
                            snakeOne.color = "WhiteSmoke";
                            snakeTwo.color = "LightSkyBlue ";
                        } else {
                            this.BOTTOM_COLOR = "gray";
                            this.BLOCK_COLOR = "white";
                            snakeOne.color = "blue";
                            snakeTwo.color = "purple";
                        }
                        break;
                    }
                }

                this.special_food_type = this.special_food_types[Math.floor(Math.random() * (this.special_food_types.length))];

            }
            else if (snakeTwo.head.equals(this.special_food_point)) {
                this.special_food_point = this.getRandomPointNotInList([...snakeOne.trail, ...snakeTwo.trail]);

                switch (this.special_food_type) {
                    case "big": {
                        snakeTwo.length += 2;
                        break;
                    }

                    case "small": {
                        snakeTwo.length -= Math.round(snakeTwo.length / 10);
                        break;
                    }

                    case "color": {
                        if (this.BLOCK_COLOR === "white") {
                            this.BOTTOM_COLOR = "white";
                            this.BLOCK_COLOR = "black";
                            snakeTwo.color = "lime"
                        } else if (this.BLOCK_COLOR === "black") {
                            this.BOTTOM_COLOR = "tomato";
                            this.BLOCK_COLOR = "purple";
                            snakeTwo.color = "orange"
                        } else if (this.BLOCK_COLOR === "purple") {
                            this.BOTTOM_COLOR = "pink";
                            this.BLOCK_COLOR = "wheat";
                            snakeTwo.color = "whitesmoke"
                        } else {
                            this.BOTTOM_COLOR = "gray";
                            this.BLOCK_COLOR = "white";
                            snakeTwo.color = "blue";
                        }
                        break;
                    }
                }

                this.special_food_type = this.special_food_types[Math.floor(Math.random() * (this.special_food_types.length))];

            }
            // end of new code
        } else {
            // get name
            this.clearAllCycles();

            if ($) {
                console.log("jQuery loaded");
            }
            let current_milis = Math.round(this.milis / 1000);
            let current_difficulty = this.difficulty;

            this.getName(this.canvas, ctx, "Enter player's name: ",
                function (name) {
                    let url: string = "https://asocial-setting.000webhostapp.com/scores.php";
                    console.log(name.toString(), (snakeOne.length + snakeTwo.length).toString(), current_milis.toString(), current_difficulty);
                    let data = {
                        type: 'mp',
                        name: name.toString(),
                        score: (snakeOne.length + snakeTwo.length).toString(),
                        time: current_milis.toString(),
                        difficulty: current_difficulty.toString()
                    };
                    $.post(url, data, (response) => {
                        console.log(response);
                    });

                    console.log(name);
                    menu.ShowMenu(container);
                    location.reload();
                });
        }

        ctx.fillStyle = snakeOne.color;
        ctx.fillText("Player 1 - Length: " + snakeOne.length + " Time: " + Math.floor(this.milis / 1000), this.block_size, this.block_size);
        ctx.fillStyle = snakeTwo.color;
        ctx.fillText("Player 2 - Length: " + snakeTwo.length, this.block_size, this.block_size * 2);

    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < this.vSize; i++) {
            for (let j = 0; j < this.hSize; j++) {


                ctx.fillStyle = this.BOTTOM_COLOR;
                ctx.fillRect(i * this.block_size, j * this.block_size, this.block_size, this.block_size);


                ctx.fillStyle = this.BLOCK_COLOR;
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
        quitButton.addEventListener("click", () => {
            console.log("Exited");
            this.clearAllCycles();
            this.menu.ShowMenu(this.container);
            location.reload();
        });
        this.btnQuit = quitButton;
        this.container.appendChild(quitButton);
    }

    clearAllCycles() {
        for (let i = 0; i < 1000; i += 1) {
            clearInterval(this.cycle);
            clearInterval(i);
        }
        console.log("clear All Cycles");
    }

    getName(canvas, ctx, text, cb) {
        //setup screen
        let name = '';
        this.erase();
        this.addBackToMenuButton();

        let context = this.canvas.getContext("2d");
        ctx = context;

        let x = Math.round(this.width / 2);
        let y = Math.round((this.height / 2) - (this.height * 0.1));

        ctx.font = "22px Arial";
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        ctx.font = "46px Verdana";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", x, y);

        ctx.fillStyle = 'white';
        ctx.fillText(text, x, y + 50);
        ctx.fillText(name, x, y + 100);

        //listen to keystrokes
        document.addEventListener("keyup", listenToName, true);
        let allKeyboardKeysRegex = /^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*$/;

        function listenToName(e) {
            // if character or number add to name, if backspace shorten last char, if enter
            // callback function and remove this event listener
            if (e.key.length == 1 && e.key.match(allKeyboardKeysRegex))
                name += e.key;
            else if (e.key == 'Backspace')
                name = name.slice(0, -1);
            else if (e.key == 'Enter') {
                console.log(name);
                cb(name);
                document.removeEventListener("keyup", listenToName, true);
            }
            //refresh name dialog
            ctx.font = "22px Arial";
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            ctx.font = "46px Verdana";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Game Over!", x, y);

            ctx.fillStyle = 'white';
            ctx.fillText(text, x, y + 50);
            ctx.fillText(name, x, y + 100);
        }
    }

}