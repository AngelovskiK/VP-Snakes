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
        var food = [new Point(3, 2), new Point(3, 3)];
        var obstacles = [new Point(1, 1), new Point(2, 1), new Point(2, 2)];
        var problem = new Problem(player, food, obstacles, 4, 3);
        var answer = traversal.astar_graph_search(problem);
        console.log(answer);
        console.log(answer.solution());
        console.log(answer.solve());
        var new_player = answer.solve()[1][0];
        var x = new_player.x;
        var y = new_player.y;
    };
    return Test;
}());
//# sourceMappingURL=test.js.map