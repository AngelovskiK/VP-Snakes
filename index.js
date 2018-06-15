"use strict";
exports.__esModule = true;
var menu_1 = require("./menu");
var test_1 = require("./test");
function main() {
    var container = document.getElementById("container");
    var menu = new menu_1.Menu();
    menu.ShowMenu(container);
    var test = new test_1.Test(1);
    test.main();
}
main();
console.log("index.js");
