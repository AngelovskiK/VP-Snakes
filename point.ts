export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    equals(that: Point) {
        return this.x === that.x && this.y === that.y;
    }

    static equalsTwo(one: Point, two: Point) {
        return one.x === two.x && one.y === two.y;
    }

    static isInList(target:Point, list: Array<Point>){
        for(let point of list){
            if(target.equals(point)){
                return true;
            }
        }
        return false;
    }
}