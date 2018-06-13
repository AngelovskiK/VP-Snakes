class ProblemNode {

    state: any;
    parent: ProblemNode;
    action: any;
    path_cost: number;
    depth: number;


    constructor(state: any, parent: ProblemNode = null, action: any = null, path_cost: number = 0) {
        this.state = state;
        this.parent = parent;
        this.action = action;
        this.path_cost = path_cost;
        this.depth = 0;
        if (typeof this.parent != undefined) {
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
            result.push(this.child_node(problem, this.action))
        }
        return result
    }
}