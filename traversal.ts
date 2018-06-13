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
        queue.push(new ProblemNode(problem.state));
        while (queue.length > 0) {
            let node: ProblemNode = queue.shift();
            console.log(node.state);
            if (problem.goal_test(node.state)) {
                return node;
            }
            queue.push.apply(queue, node.expand(problem));
        }

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