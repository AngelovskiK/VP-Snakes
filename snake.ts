class Snake {
    traversal = new Traversal();

    head: Point;
    direction: number;

    color: string;
    length: number;
    trail: Array<Point>;

    horizontal_size: number;
    vertical_size: number;

    // food: Array<Point>, obstacles: Array<Point>
    constructor(x: number, y: number, direction: Direction, color: string,
                horizontal_size: number, vertical_size: number) {
        this.head = new Point(x, y);
        this.direction = direction;
        this.color = color;
        this.length = 3;
        this.trail = [];

        this.horizontal_size = horizontal_size;
        this.vertical_size = vertical_size;
        console.log("horizontal_size", horizontal_size);
        console.log("vertical_size", vertical_size);
    }

    get_next_move(food_point: Point): Point {
        let problem: Problem = new Problem(this.head, this.direction, [food_point], this.trail, this.horizontal_size, this.vertical_size);
        let answer: ProblemNode = this.traversal.astar_graph_search(problem);
        let solution = answer.solution();
        let solve = answer.solve();

        let playerMovements = solve.map(state => state[0]);
        // console.log(solution);
        // console.log(solve);
        // console.log(answer.path_cost);
        // console.log(playerMovements);
        // console.log("trail: ", this.trail);
        // console.log("snake.head", this.head);

        return solve[1][0];
    }

    get_next_move_other(food_point: Point): Point {
        let grid = [];
        for (let i = 0; i < this.horizontal_size; i++) {
            let row = [];
            for (let j = 0; j < this.vertical_size; j++) {
                let current_point: Point = new Point(i, j);
                if (Point.isInList(current_point, this.trail)) {
                    // 0 means it's an obstacle
                    row.push(0);
                } else {
                    // you may move here with a weight of 1
                    row.push(1);
                }
            }
            grid.push(row);
        }
        // console.log(grid);
        var graph = new Graph(grid);
        var start = graph.grid[this.head.x][this.head.y];
        var end = graph.grid[food_point.x][food_point.y];
        var result = astar.search(graph, start, end);
        // console.log(result);
        return new Point(result[0]["x"], result[0]["y"]);
    }

    draw(ctx, block_size: number, ten_percent: number) {
        ctx.fillStyle = this.color;
        this.trail.forEach(block =>
            ctx.fillRect(block.y * block_size, block.x * block_size,
                block_size - ten_percent * 4, block_size - ten_percent * 4));
    }

    move(direction: Direction): Point {
        switch (direction) {
            case Direction.Up: {
                this.head = new Point(this.head.x - 1, this.head.y);
                break;
            }
            case Direction.Down: {
                this.head = new Point(this.head.x + 1, this.head.y);
                break;
            }
            case Direction.Left: {
                this.head = new Point(this.head.x, this.head.y - 1);
                break;
            }
            case Direction.Right: {
                this.head = new Point(this.head.x, this.head.y + 1);
                break;
            }
        }

        /* Wrap World */
        if (this.head.x === this.vertical_size) {
            this.head = new Point(0, this.head.y + 1);
        } else if (this.head.x === -1) {
            this.head = new Point(this.vertical_size - 1, this.head.y);
        } else if (this.head.y === this.horizontal_size) {
            this.head = new Point(this.head.x, 0);
        } else if (this.head.y === -1) {
            this.head = new Point(this.head.x, this.horizontal_size - 1);
        }

        return this.head;
    }
}