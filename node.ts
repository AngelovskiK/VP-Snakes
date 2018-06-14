class ProblemNode {

    state: any;
    parent: ProblemNode;
    action: any;
    path_cost: number;
    depth: number;


    constructor(state: any, parent: ProblemNode = null, action: any = null, path_cost: number = 0) {
        this.state = state;
        // console.log("Node state", this.state);
        this.parent = parent;
        this.action = action;
        this.path_cost = path_cost;
        this.depth = 0;
        // console.log("Parent", parent);
        if (this.parent != null) {
            this.depth = parent.depth + 1
        }
    }

    child_node(problem: Problem, action) {
        let next = problem.result(this.state, action);
        return new ProblemNode(next, this, action, problem.path_cost(this.path_cost, this.state, action, next));
    }

    expand(problem: Problem) {
        let result = [];
        for (let action of problem.actions(this.state)) {
            result.push(this.child_node(problem, action))
        }
        return result
    }

    path() {
        let result = [];
        let node: ProblemNode = this;
        while (node) {
            result.push(node);
            node = node.parent;
        }
        return result.reverse();
    }

    solution() {
        /* Return the sequence of actions to go from the root to this node. */
        let result = [];
        for (let node of this.path()) {
            result.push(node.action);
        }
        return result;
    }

    solve() {
        /* Return the sequence of states to go from the root to this node. */
        let result = [];
        for (let node of this.path()) {
            result.push(node.state);
        }
        return result;
    }

    equals(that: ProblemNode) {
        return this.state == that.state;
    }
}