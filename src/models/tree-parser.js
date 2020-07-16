import { v4 as uuid } from "uuid";
import { checked, indeterminate } from "../utils/recursive-utils";

const defaultConfig = {
  childrenPropertyName: "children",
};

export class TreeParser {
  constructor(config) {
    this.config = Object.assign(defaultConfig, config);
  }

  addChildToNode(node, child) {
    node.children.push(child);
    return child;
  }

  parse(model) {
    if (!(model instanceof Object)) {
      throw new TypeError("Model must be of type object.");
    }

    const node = new Node(model);

    if (model[this.config.childrenPropertyName] instanceof Array) {
      model[this.config.childrenPropertyName].forEach((child) => {
        this.addChildToNode(node, this.parse(child));
      });
    }

    return node;
  }
}

export class Node {
  constructor(model) {
    Object.assign(this, model);
    this.key = model.key || uuid();
    this.children = [];
  }

  isChecked() {
    return checked(this);
  }

  isIndeterminate() {
    return indeterminate(this);
  }
}
