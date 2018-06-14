var Snake = /** @class */ (function () {
    // food: Array<Point>, obstacles: Array<Point>
    function Snake(x, y, direction, color) {
        this.traversal = new Traversal();
        this.head = new Point(x, y);
        this.direction = direction;
        this.color = color;
        this.length = 3;
        this.trail = [];
    }
    Snake.prototype.get_next_move = function (food_point, vSize, hSize) {
        var problem = new Problem(this.head, this.direction, [food_point], this.trail, vSize, hSize);
        var answer = this.traversal.breadth_first_tree_search(problem);
        var solution = answer.solution();
        var solve = answer.solve();
        var playerMovements = solve.map(function (state) { return state[0]; });
        console.log(solution);
        console.log(solve);
        console.log(answer.path_cost);
        console.log(playerMovements);
        console.log("trail: ", this.trail);
        console.log("snake.head", this.head);
        return solve[1][0];
    };
    Snake.prototype.draw = function (ctx, block_size, ten_percent, vSize, hSize) {
        ctx.fillStyle = this.color;
        this.trail.forEach(function (block) {
            return ctx.fillRect(block.y * block_size, block.x * block_size, block_size - ten_percent * 4, block_size - ten_percent * 4);
        });
    };
    Snake.prototype.move = function (direction) {
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
    };
    return Snake;
}());
//# sourceMappingURL=snake.js.map