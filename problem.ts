class Problem {

    /**
     * |---------------> Y
     * |               Y
     * |  axises
     * |
     * v X
     * X
     *
     * */

    /**
     * The State is the locations of:
     * ai_player, food, obstacles(other players)
     * */

    state: any;
    goal: Point;
    grid: Array<Point>;

    constructor(player: Point, food: Array<Point>, obstacles: Array<Point>,
                goal: Point,
                hSize: number, vSize: number) {
        this.state = [player, food, obstacles];
        this.goal = goal;
        this.grid = [];

        for (let i = 0; i < vSize; i++) {
            for (let j = 0; j < hSize; j++) {
                this.grid.push(new Point(i, j));
            }
        }
        console.log(this.grid);
    }

    goal_test(state) {
        let player: Point = state[0];
        return player.equals(this.goal);
    }

    successor(state: any) {
        let successors = {};
        let player: Point = state[0];
        let food: Array<Point> = state[1];
        let obstacles: Array<Point> = state[2];

        let modified_player: Point = null;

        // if player is in grid
        if (this.grid.indexOf(player) >= 0) {
            // UP
            modified_player = new Point(player.x - 1, player.y);
            if (this.grid.indexOf(modified_player) >= 0 &&
                !(obstacles.indexOf(modified_player) >= 0)) {
                let new_state = [modified_player, food, obstacles];
                successors["UP"] = new_state;
            }
            // DOWN
            modified_player = new Point(player.x + 1, player.y);
            if (this.grid.indexOf(modified_player) >= 0 &&
                !(obstacles.indexOf(modified_player) >= 0)) {
                let new_state = [modified_player, food, obstacles];
                successors["DOWN"] = new_state;
            }
            // LEFT
            modified_player = new Point(player.x, player.y - 1);
            if (this.grid.indexOf(modified_player) >= 0 &&
                !(obstacles.indexOf(modified_player) >= 0)) {
                let new_state = [modified_player, food, obstacles];
                successors["LEFT"] = new_state;
            }
            // RIGHT
            modified_player = new Point(player.x, player.y + 1);
            if (this.grid.indexOf(modified_player) >= 0 &&
                !(obstacles.indexOf(modified_player) >= 0)) {
                let new_state = [modified_player, food, obstacles];
                successors["RIGHT"] = new_state;
            }
        }

        console.log(successors);
        return successors;
    }

    heuristic(node: ProblemNode) {
        let player: Point = node.state[0]
        return Problem.manhattan_distance(player, this.goal);
    }

    static manhattan_distance(start: Point, end: Point) {
        return Math.abs(end.x - start.x) + Math.abs(end.y - start.y);
    }

    result(state: any, action: any) {
        let possible = this.successor(state);
        return possible[action];
    }

    path_cost(path_cost: number, state: any, action: any, next: any) {
        return path_cost + 1;
    }

    actions(state: any) {
        // let keys = [];
        // for (let key of this.successor(state)) {
        //     keys.push(key);
        // }
        return Object.keys(this.successor(state));
    }
}