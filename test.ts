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
        let food: Array<Point> = [new Point(3, 3), new Point(3,2)];
        let obstacles: Array<Point> = [new Point(1, 1), new Point(2, 1), new Point(2, 2)];
        let problem: Problem = new Problem(player, food, obstacles, 3, 3);
        let answer = traversal.breadth_first_tree_search(problem);
        console.log(answer);
        console.log(answer.solution());
    }

}