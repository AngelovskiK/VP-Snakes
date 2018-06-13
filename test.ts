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
        let target = 'c';
        let list = ['a', 'b', 'c'];
        console.log(target);
        console.log(target in list);
        console.log(list.indexOf(target) >= 0)
    }

}