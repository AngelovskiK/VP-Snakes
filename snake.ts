class Snake {
    traversal = new Traversal();

    head: Point;
    direction: number;

    color: string;
    length: number;
    trail: Array<Point>;

    // food: Array<Point>, obstacles: Array<Point>
    constructor(x: number, y: number, direction: Direction, color: string) {
        this.head = new Point(x, y);
        this.direction = direction;
        this.color = color;
        this.length = 3;
        this.trail = [];
    }

    get_next_move(food_point: Point, vSize: number, hSize: number): Point {
        let problem: Problem = new Problem(this.head, this.direction, [food_point], this.trail, vSize, hSize);
        let answer = this.traversal.breadth_first_tree_search(problem);
        let solution = answer.solution();
        let solve = answer.solve();

        let playerMovements = solve.map(state => state[0]);
        console.log(solution);
        console.log(solve);
        console.log(answer.path_cost);
        console.log(playerMovements);
        console.log("trail: ", this.trail);
        console.log("snake.head", this.head);

        return solve[1][0];
    }

    draw(ctx, block_size: number, ten_percent: number, vSize: number, hSize: number) {
        ctx.fillStyle = this.color;
        this.trail.forEach(block =>
            ctx.fillRect(block.y * block_size, block.x * block_size,
                block_size - ten_percent * 4, block_size - ten_percent * 4));
    }

    move(direction: Direction): Point {
        switch (direction) {
            case Direction.Up: {
                this.head = new Point(this.head.x - 1, this.head.y);
                return this.head;
            }
            case Direction.Down: {
                this.head = new Point(this.head.x + 1, this.head.y);
                return this.head;
            }
            case Direction.Left: {
                this.head = new Point(this.head.x, this.head.y + 1);
                return this.head;
            }
            case Direction.Right: {
                this.head = new Point(this.head.x, this.head.y - 1);
                return this.head;
            }
        }
        return null;
    }
}