var ProblemNode = /** @class */ (function () {
    function ProblemNode(state, parent, action, path_cost) {
        if (parent === void 0) { parent = null; }
        if (action === void 0) { action = null; }
        if (path_cost === void 0) { path_cost = 0; }
        this.state = state;
        // console.log("Node state", this.state);
        this.parent = parent;
        this.action = action;
        this.path_cost = path_cost;
        this.depth = 0;
        // console.log("Parent", parent);
        if (this.parent != null) {
            this.depth = parent.depth + 1;
        }
    }
    ProblemNode.prototype.child_node = function (problem, action) {
        var next = problem.result(this.state, action);
        return new ProblemNode(next, this, action, problem.path_cost(this.path_cost, this.state, action, next));
    };
    ProblemNode.prototype.expand = function (problem) {
        var result = [];
        for (var _i = 0, _a = problem.actions(this.state); _i < _a.length; _i++) {
            var action = _a[_i];
            result.push(this.child_node(problem, action));
        }
        return result;
    };
    ProblemNode.prototype.path = function () {
        var result = [];
        var node = this;
        while (node) {
            result.push(node);
            node = node.parent;
        }
        return result.reverse();
    };
    ProblemNode.prototype.solution = function () {
        /* Return the sequence of actions to go from the root to this node. */
        var result = [];
        for (var _i = 0, _a = this.path(); _i < _a.length; _i++) {
            var node = _a[_i];
            result.push(node.action);
        }
        return result;
    };
    ProblemNode.prototype.solve = function () {
        /* Return the sequence of states to go from the root to this node. */
        var result = [];
        for (var _i = 0, _a = this.path(); _i < _a.length; _i++) {
            var node = _a[_i];
            result.push(node.state);
        }
        return result;
    };
    ProblemNode.prototype.equals = function (that) {
        var player = this.state[0];
        var other_player = that.state[0];
        return player.equals(other_player);
    };
    return ProblemNode;
}());
//# sourceMappingURL=node.js.map