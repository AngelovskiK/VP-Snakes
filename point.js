"use strict";
exports.__esModule = true;
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
    Point.isInList = function (target, list) {
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var point = list_1[_i];
            if (target.equals(point)) {
                return true;
            }
        }
        return false;
    };
    return Point;
}());
exports.Point = Point;
