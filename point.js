var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    Point.prototype.equals = function (that) {
        return this.x === that.x && this.y === that.y;
    };
    Point.equalsTwo = function (one, two) {
        return one.x === two.x && one.y === two.y;
    };
    return Point;
}());
//# sourceMappingURL=point.js.map