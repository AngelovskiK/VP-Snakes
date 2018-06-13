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
        var traversal = new Traversal();
        var player = new Point(0, 0);
        var food = [new Point(3, 3), new Point(3, 2)];
        var obstacles = [new Point(1, 1), new Point(2, 1), new Point(2, 2)];
        var problem = new Problem(player, food, obstacles, 3, 3);
        var answer = traversal.breadth_first_tree_search(problem);
        console.log(answer);
        console.log(answer.solution());
    };
    return Test;
}());
//# sourceMappingURL=test.js.map