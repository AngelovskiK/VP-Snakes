class Test {
    x: number;
    y: number;

    constructor(x: number, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    main() {
        let traversal = new Traversal();

        let player: Point = new Point(0, 0);
        let food: Array<Point> = [new Point(3, 2), new Point(3, 3)];
        let obstacles: Array<Point> = [new Point(1, 1), new Point(2, 1), new Point(2, 2)];
        let problem: Problem = new Problem(player, food, obstacles, 4, 3);
        let answer = traversal.astar_graph_search(problem);
        console.log(answer);
        console.log(answer.solution());
        console.log(answer.solve());

        let new_player:Point = answer.solve()[1][0];
        let x: number = new_player.x;
        let y: number = new_player.y;
    }

}