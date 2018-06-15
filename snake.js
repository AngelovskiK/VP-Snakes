"use strict";
exports.__esModule = true;
var point_1 = require("./point");
var problem_1 = require("./problem");
var traversal_1 = require("./traversal");
var javascript_astar_1 = require("./node_modules/javascript-astar");
var Snake = /** @class */ (function () {
    // food: Array<Point>, obstacles: Array<Point>
    function Snake(x, y, direction, color, horizontal_size, vertical_size, type_of_ai) {
        this.traversal = new traversal_1.Traversal();
        this.head = new point_1.Point(x, y);
        this.direction = direction;
        this.color = color;
        this.length = 3;
        this.trail = [];
        this.horizontal_size = horizontal_size;
        this.vertical_size = vertical_size;
        console.log("horizontal_size", horizontal_size);
        console.log("vertical_size", vertical_size);
        this.type_of_ai = type_of_ai;
    }
    Snake.prototype.get_next_move = function (food_point) {
        if (this.type_of_ai === 0) {
            var problem = new problem_1.Problem(this.head, this.direction, [food_point], this.trail, this.horizontal_size, this.vertical_size);
            var answer = this.traversal.breadth_first_tree_search(problem);
            var solution = answer.solution();
            var solve = answer.solve();
            var playerMovements = solve.map(function (state) { return state[0]; });
            // console.log(solution);
            // console.log(solve);
            // console.log(answer.path_cost);
            // console.log(playerMovements);
            // console.log("trail: ", this.trail);
            // console.log("snake.head", this.head);
            return solve[1][0];
        }
        return this.get_next_move_other(food_point);
    };
    Snake.prototype.get_next_move_other = function (food_point) {
        var grid = [];
        for (var i = 0; i < this.horizontal_size; i++) {
            var row = [];
            for (var j = 0; j < this.vertical_size; j++) {
                var current_point = new point_1.Point(i, j);
                if (point_1.Point.isInList(current_point, this.trail)) {
                    // 0 means it's an obstacle
                    row.push(0);
                }
                else {
                    // you may move here with a weight of 1
                    row.push(1);
                }
            }
            grid.push(row);
        }
        // console.log(grid);
        var graph = new javascript_astar_1.Graph(grid);
        var start = graph.grid[this.head.x][this.head.y];
        var end = graph.grid[food_point.x][food_point.y];
        var result = javascript_astar_1.astar.search(graph, start, end);
        // console.log(result);
        return new point_1.Point(result[0]["x"], result[0]["y"]);
    };
    Snake.prototype.draw = function (ctx, block_size, ten_percent) {
        ctx.fillStyle = this.color;
        this.trail.forEach(function (block) {
            return ctx.fillRect(block.y * block_size, block.x * block_size, block_size - ten_percent * 4, block_size - ten_percent * 4);
        });
    };
    Snake.prototype.move = function (direction) {
        switch (direction) {
            case problem_1.Direction.Up: {
                this.head = new point_1.Point(this.head.x - 1, this.head.y);
                break;
            }
            case problem_1.Direction.Down: {
                this.head = new point_1.Point(this.head.x + 1, this.head.y);
                break;
            }
            case problem_1.Direction.Left: {
                this.head = new point_1.Point(this.head.x, this.head.y - 1);
                break;
            }
            case problem_1.Direction.Right: {
                this.head = new point_1.Point(this.head.x, this.head.y + 1);
                break;
            }
        }
        /* Wrap World */
        if (this.head.x === this.vertical_size) {
            this.head = new point_1.Point(0, this.head.y);
        }
        else if (this.head.x === -1) {
            this.head = new point_1.Point(this.vertical_size - 1, this.head.y);
        }
        else if (this.head.y === this.horizontal_size) {
            this.head = new point_1.Point(this.head.x, 0);
        }
        else if (this.head.y === -1) {
            this.head = new point_1.Point(this.head.x, this.horizontal_size - 1);
        }
        return this.head;
    };
    return Snake;
}());
exports.Snake = Snake;
