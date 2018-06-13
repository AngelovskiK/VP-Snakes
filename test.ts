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
        let comparator = (a, b) => a < b;
        let queue: PriorityQueue = new PriorityQueue(comparator);
        queue.push(10, 20, 30, 40, 50);
        queue.push(33, 13, 41, 34);
        while (!queue.isEmpty()) {
            console.log(queue.pop()); //=> 40, 30, 20, 10
        }
    }

}