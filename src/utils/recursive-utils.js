export const recursive = (node, action, childrenPropertyName = "children") => {
  if (!node[childrenPropertyName] || node[childrenPropertyName].length === 0) {
    action(node);
    return;
  }

  node[childrenPropertyName].forEach((child) => {
    recursive(child, action, childrenPropertyName);
  });
};

export const recursiveEvery = (
  node,
  predicate,
  childrenPropertyName = "children"
) =>
  predicate(node) ||
  (node[childrenPropertyName].length > 0 &&
    node[childrenPropertyName].every((child) =>
      recursiveEvery(child, predicate, childrenPropertyName)
    ));

export const recursiveSome = (
  node,
  predicate,
  childrenPropertyName = "children"
) =>
  predicate(node) ||
  (node[childrenPropertyName].length > 0 &&
    node[childrenPropertyName].some((child) =>
      recursiveSome(child, predicate, childrenPropertyName)
    ));

export const indeterminate = (node) =>
  !checked(node) &&
  node.children &&
  node.children.length > 0 &&
  recursiveSome(node, (n) => n.checked);

export const checked = (node) =>
  node.checked || recursiveEvery(node, (n) => n.checked);
