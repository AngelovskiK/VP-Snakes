var Test = /** @class */ (function () {
    function Test(x, y) {
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Test.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    Test.prototype.main = function () {
        var comparator = function (a, b) { return a < b; };
        var queue = new PriorityQueue(comparator);
        queue.push(10, 20, 30, 40, 50);
        queue.push(33, 13, 41, 34);
        while (!queue.isEmpty()) {
            console.log(queue.pop()); //=> 40, 30, 20, 10
        }
    };
    return Test;
}());
//# sourceMappingURL=test.js.map