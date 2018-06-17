var Traversal = /** @class */ (function () {
    function Traversal() {
    }
    //  other_breadth_first_search(start) {
    //     let listToExplore = [start];
    //
    //     nodes[start].visited = true;
    //
    //     while (listToExplore.length > 0) {
    //         console.log(listToExplore);
    //         let nodeIndex = listToExplore.shift();
    //         nodes[nodeIndex].links.forEach(function (childIndex) {
    //             if (!nodes[childIndex].visited) {
    //                 nodes[childIndex].visited = true;
    //                 listToExplore.push(childIndex);
    //             }
    //         });
    //     }
    // };
    Traversal.prototype.breadth_first_tree_search = function (problem) {
        var queue = [];
        var visited = [];
        queue.push(new ProblemNode(problem.state));
        // console.log("Problem", problem);
        //visited.push(new ProblemNode(problem.state));
        //while (queue.length > 0) {
        var i = 0;
        //|| i < 1000000
        while (queue.length > 0) {
            // for (let item of queue) {
            //     console.log("Queue", item.state[0]);
            // }
            // for (let item of visited) {
            //     console.log("Visited", item[0]);
            // }
            var node = queue.shift();
            //console.log("node", node);
            //console.log("node.state", node.state);
            if (problem.goal_test(node.state)) {
                return node;
            }
            // console.log("Node State", node.state[0]);
            // console.log("Condition", !Problem.contains_node_state(node.state, visited));
            if (!Problem.contains_node_state(node.state, visited)) {
                visited.push(node.state);
                queue.push.apply(queue, node.expand(problem));
            }
            i += 1;
        }
        return null;
    };
    Traversal.prototype.best_first_graph_search = function (problem, compute) {
        var node = new ProblemNode(problem.state);
        if (problem.goal_test(node.state)) {
            return node;
        }
        // Min Queue
        var comparator = function (a, b) { return a < b; };
        var queue = new PriorityQueue(comparator);
        queue.push(node);
        var visited = [];
        while (!queue.isEmpty()) {
            var node_1 = queue.pop();
            // console.log(node.state);
            if (problem.goal_test(node_1.state)) {
                return node_1;
            }
            visited.push(node_1.state);
            console.log(node_1.expand(problem));
            for (var _i = 0, _a = node_1.expand(problem); _i < _a.length; _i++) {
                var child = _a[_i];
                if (!Problem.contains_node_state(child.state, visited) &&
                    !Problem.contains_node(child, queue._heap)) {
                    queue.push(child);
                }
                else if (Problem.contains_node(child, queue._heap)) {
                    // console.log("Problem.contains_node(child, queue._heap)");
                    var existing = queue.find(child);
                    if (!existing)
                        continue;
                    // console.log("Compute", child, existing);
                    if (compute(child) < compute(existing)) {
                        queue.remove(existing);
                        queue.push(child);
                    }
                }
            }
        }
        return null;
    };
    Traversal.prototype.greedy_best_first_graph_search = function (problem) {
        return this.best_first_graph_search(problem, function (node) { return problem.heuristic(node); });
    };
    Traversal.prototype.astar_graph_search = function (problem) {
        return this.best_first_graph_search(problem, function (node) { return node.path_cost + problem.heuristic(node); });
    };
    return Traversal;
}());
//# sourceMappingURL=traversal.js.map