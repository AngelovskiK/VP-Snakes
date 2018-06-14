var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
var Problem = /** @class */ (function () {
    function Problem(player, direction, food, obstacles, vSize, hSize) {
        this.state = [player, food, obstacles, direction];
        this.grid = [];
        for (var i = 0; i < vSize; i++) {
            for (var j = 0; j < hSize; j++) {
                this.grid.push(new Point(i, j));
            }
        }
        // console.log("Grid: ", this.grid);
        //this.goal = food[0];
        var min = Number.MAX_VALUE;
        for (var _i = 0, food_1 = food; _i < food_1.length; _i++) {
            var item = food_1[_i];
            if (Problem.contains(item, this.grid)) {
                var current = Problem.manhattan_distance(player, item);
                if (current < min) {
                    min = current;
                    this.goal = item;
                }
            }
        }
        // let smallest = food
        //     .map((item) => [item, Problem.manhattan_distance(player, item)])
        //     .reduce((a, b) => a[1] < b[1] ? a : b)[0];
        // this.goal = new Point(smallest.x, smallest.y);
        console.log("Goal: ", this.goal.toString());
    }
    Problem.prototype.goal_test = function (state) {
        //console.log("goal_test state:", state);
        var player = state[0];
        return player.equals(this.goal);
    };
    Problem.prototype.successor = function (state) {
        var successors = {};
        var player = state[0];
        var food = state[1];
        var obstacles = state[2];
        var direction = state[3];
        var modified_player = null;
        var modified_obstacles = [];
        modified_obstacles.push.apply(modified_obstacles, obstacles);
        var previous_move = this.getPreviousMove(player, direction);
        // console.log("previous_move", previous_move);
        // modified_obstacles.push(previous_move);
        modified_obstacles.push.apply(modified_obstacles, [previous_move]);
        // console.log("modified_obstacles", modified_obstacles);
        // console.log("Player in grid: ", this.grid.indexOf(player) >= 0);
        // console.log("Player contained in grid: ", Problem.contains(player, this.grid));
        // if player is in grid
        if (Problem.contains(player, this.grid)) {
            // UP
            modified_player = new Point(player.x - 1, player.y);
            if (Problem.contains(modified_player, this.grid) &&
                !(Problem.contains(modified_player, modified_obstacles))) {
                var new_state = [modified_player, food, obstacles, Direction.Up];
                successors["UP"] = new_state;
            }
            // DOWN
            modified_player = new Point(player.x + 1, player.y);
            if (Problem.contains(modified_player, this.grid) &&
                !(Problem.contains(modified_player, modified_obstacles))) {
                var new_state = [modified_player, food, obstacles, Direction.Down];
                successors["DOWN"] = new_state;
            }
            // LEFT
            modified_player = new Point(player.x, player.y - 1);
            if (Problem.contains(modified_player, this.grid) &&
                !(Problem.contains(modified_player, modified_obstacles))) {
                var new_state = [modified_player, food, obstacles, Direction.Left];
                successors["LEFT"] = new_state;
            }
            // RIGHT
            modified_player = new Point(player.x, player.y + 1);
            if (Problem.contains(modified_player, this.grid) &&
                !(Problem.contains(modified_player, modified_obstacles))) {
                var new_state = [modified_player, food, obstacles, Direction.Right];
                successors["RIGHT"] = new_state;
            }
        }
        // console.log("successors", successors);
        return successors;
    };
    Problem.prototype.heuristic = function (node) {
        var player = node.state[0];
        return Problem.manhattan_distance(player, this.goal);
    };
    Problem.manhattan_distance = function (start, end) {
        return Math.abs(end.x - start.x) + Math.abs(end.y - start.y);
    };
    Problem.prototype.result = function (state, action) {
        var possible = this.successor(state);
        // console.log("successor state result", possible, possible[action]);
        return possible[action];
    };
    Problem.prototype.path_cost = function (path_cost, state, action, next) {
        return path_cost + 1;
    };
    Problem.prototype.actions = function (state) {
        // let keys = [];
        // for (let key of this.successor(state)) {
        //     keys.push(key);
        // }
        return Object.keys(this.successor(state));
    };
    Problem.prototype.getPreviousMove = function (player, direction) {
        switch (direction) {
            // This returns the opposite
            // If you're going up, you'll get the down position
            case Direction.Up: {
                return new Point(player.x + 1, player.y);
            }
            case Direction.Down: {
                return new Point(player.x - 1, player.y);
            }
            case Direction.Left: {
                return new Point(player.x, player.y + 1);
            }
            case Direction.Right: {
                return new Point(player.x, player.y - 1);
            }
            default: {
                break;
            }
        }
        return player;
    };
    Problem.contains = function (object, list) {
        //console.log("Problem.contains:", object, list);
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (object.equals(item)) {
                return true;
            }
        }
        return false;
    };
    Problem.contains_node = function (object, list) {
        //console.log("Problem.contains:", object, list);
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var item = list_2[_i];
            if (object.equals(item)) {
                return true;
            }
        }
        return false;
    };
    Problem.contains_node_state = function (state, states) {
        //console.log("Problem.contains:", object, list);
        for (var _i = 0, states_1 = states; _i < states_1.length; _i++) {
            var item = states_1[_i];
            if (Point.equalsTwo(state[0], item[0])) {
                return true;
            }
        }
        return false;
    };
    return Problem;
}());
//# sourceMappingURL=problem.js.map