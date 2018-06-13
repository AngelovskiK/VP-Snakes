class Traversal {

    constructor() {

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

    breadth_first_tree_search(problem: Problem) {

        let queue = [];
        let visited = [];
        queue.push(new ProblemNode(problem.state));
        console.log("Problem", problem);
        //visited.push(new ProblemNode(problem.state));
        //while (queue.length > 0) {
        let i: number = 0;
        //|| i < 1000000
        while (queue.length > 0) {

            for (let item of queue) {
                console.log("Queue", item.state[0]);
            }
            for (let item of visited) {
                console.log("Visited", item[0]);
            }
            let node: ProblemNode = queue.shift();
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
    }

    best_first_graph_search(problem: Problem, compute) {

        let node: ProblemNode = new ProblemNode(problem.state);
        if (problem.goal_test(node.state)) {
            return node;
        }
        // Min Queue
        let comparator = (a, b) => a < b;
        let queue: PriorityQueue = new PriorityQueue(comparator);
        queue.push(node);
        let visited = [];

        while (!queue.isEmpty()) {
            let node: ProblemNode = queue.pop();
            // console.log(node.state);
            if (problem.goal_test(node.state)) {
                return node;
            }

            visited.push(node.state);
            for (let child of node.expand(problem)) {
                if (!Problem.contains_node_state(child.state, visited) &&
                    !Problem.contains_node(child, queue._heap)) {
                    queue.push(child);
                } else if (Problem.contains_node(child, queue._heap)) {
                    let existing: ProblemNode = queue.find(child);
                    if (compute(child) < compute(existing)) {
                        queue.remove(existing);
                        queue.push(child);
                    }
                }
            }
        }

        return null;
    }


    greedy_best_first_graph_search(problem) {
        return this.best_first_graph_search(problem,
            (node) => problem.heuristic(node));
    }

    astar_graph_search(problem) {
        return this.best_first_graph_search(problem,
            (node) => node.path_cost + problem.heuristic(node));
    }

    // breadth_first_search(start: Point, goal: Point) {
    //     let visited: Array<boolean> = [];
    //     let queue: Array<Point> = [start];
    //
    //     while (queue.length > 0) {
    //         let point: Point = queue.shift();
    //         if (point.equals(goal)) {
    //             return point;
    //         }
    //         queue.push()
    //     }
    // }

}