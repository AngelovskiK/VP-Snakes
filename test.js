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
        var target = 'c';
        var list = ['a', 'b', 'c'];
        console.log(target);
        console.log(target in list);
        console.log(list.indexOf(target) >= 0);
    };
    return Test;
}());
//# sourceMappingURL=test.js.map