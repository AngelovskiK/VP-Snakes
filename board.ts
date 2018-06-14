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

    constructor(container, width, height, type) {
        this.container = container;
        this.width = width;
        this.height = height;

        let common_divisor = this.common_divisors(width, height).reverse();
        switch (type){
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

        let block_size_float: number = parseFloat(this.block_size.toString());
        this.ten_percent = (block_size_float * 0.01);
        console.log(this.ten_percent);

        this.hSize = this.width / this.block_size;
        this.vSize = this.height / this.block_size;

        this.menu = new Menu();
        this.traversal = new Traversal();

        this.FOOD_COLOR = "red";
        this.food_exists = false;
        this.food_point = new Point(0,1);
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

    start() {
        this.erase();
        this.addBackToMenuButton();

        let ctx = this.canvas.getContext("2d");
        ctx.font = "22px Arial";

        this.draw(ctx);

        let snake: Snake = new Snake(2, 2, Direction.Right, "blue");

        let interval: number = 60 * 10;
        // this uses a lambda wrapper function
        let cycle = setInterval(() => this.animate(ctx, snake, interval), interval);


    }

    animate(ctx, snake: Snake, interval) {
        this.draw(ctx);

        if (!Point.isInList(snake.head, snake.trail)) {
            snake.trail.push(snake.head);
            while (snake.trail.length > snake.length) {
                snake.trail.shift();
            }

            snake.draw(ctx, this.block_size, this.ten_percent, this.vSize, this.hSize);
            this.drawFood(ctx, this.food_point, this.FOOD_COLOR);

            if (snake.trail.length === snake.length) {
                snake.head = snake.get_next_move(this.food_point, this.vSize, this.hSize);
            } else {
                snake.head = new Point(snake.head.x + 1, snake.head.y);
            }

            if (snake.head.equals(this.food_point)) {
                snake.length += 1;
                this.food_point = this.getRandomPointNotInList(snake.trail);
            }
        }
        ctx.fillText("Player 1 - Length: " + snake.length + " Speed: " + interval, this.block_size, this.block_size);
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < HEIGHT; i++) {
            for (let j = 0; j < WIDTH; j++) {

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
}