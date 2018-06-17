class Test {
    x: number;
    y: number;

    game: Game;

    constructor(x: number, y: number = 0) {
        this.x = x;
        this.y = y;
        this.game = new Game();
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    main() {

        let traversal = new Traversal();

        // let player: Point = new Point(0, 0);
        // let food: Array<Point> = [new Point(3, 2), new Point(3, 3)];
        // let obstacles: Array<Point> = [new Point(0, 1), new Point(2, 0), new Point(2, 2)];
        // let problem: Problem = new Problem(player, food, obstacles, 4, 3);
        // let answer = traversal.astar_graph_search(problem);
        // console.log(answer);
        // console.log(answer.solution());
        // console.log(answer.solve());

        // let player: Point = new Point(2, 2);
        // let food: Array<Point> = [new Point(1, 0)];
        // let obstacles: Array<Point> = [new Point(1, 2), new Point(2, 3), new Point(3, 1)];
        // let problem: Problem = new Problem(player, Direction.Right, food, obstacles, 4, 5);
        // let answer = traversal.astar_graph_search(problem);
        // console.log(answer);
        // console.log(answer.solution());
        // console.log(answer.solve());

        // let player: Point = new Point(2, 2);
        // let food: Array<Point> = [new Point(1, 0)];
        // let obstacles: Array<Point> = [new Point(1, 2), new Point(2, 3), new Point(3, 1)];
        // let problem: Problem = new Problem(player, Direction.Right, food, obstacles, 4, 5);
        // let answer = traversal.astar_graph_search(problem);
        // console.log(answer);
        // console.log(answer.solution());
        // console.log(answer.solve());


        var graph = new Graph([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]);
        var start = graph.grid[0][0];
        var end = graph.grid[1][1];
        var result = astar.search(graph, start, end);

        console.log(result);


        let grid = [];
        for (let i = 0; i < 4; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                let current_point:Point = new Point(i,j);
                    // you may move here with a weight of 1
                    row.push(1);

            }
            grid.push(row);
        }
        console.log(grid);
    }

}