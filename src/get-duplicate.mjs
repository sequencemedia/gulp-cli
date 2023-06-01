const DEFAULT_NODE_FACTORY = {
  topNode: getDuplicateOf,
  taskNode: getDuplicateOf,
  childNode: getDuplicateOf
}

function getDuplicateOf (node) {
  return Object.fromEntries(Object.entries(node))
}

function hasCompactTasks ({ compactTasks = false }) {
  return String(compactTasks) === 'true'
}

function getTasksDepth ({ tasksDepth }) {
  return (
    typeof tasksDepth === 'number' && !isNaN(tasksDepth)
      ? Math.max(1, tasksDepth)
      : null
  )
}

function nonRecursiveDuplicateNode (child, parent, nodeFactory) {
  const dupe = nodeFactory.childNode(child)
  dupe.nodes = []

  parent.nodes.push(dupe)

  if (child.branch) {
    duplicateNodesFor(child, nonRecursiveDuplicateNode, dupe, nodeFactory)
  }
}

function recursiveDuplicateNode (child, parent, maximumDepth, currentDepth, nodeFactory) {
  const dupe = nodeFactory.childNode(child)
  dupe.nodes = []

  parent.nodes.push(dupe)

  if (!maximumDepth || maximumDepth > currentDepth) {
    duplicateNodesFor(child, recursiveDuplicateNode, dupe, maximumDepth, currentDepth + 1, nodeFactory)
  }
}

function duplicateNodesFor ({ nodes }, duplicate, ...args) {
  if (Array.isArray(nodes)) {
    nodes
      .forEach((node) => {
        duplicate(node, ...args)
      })
  }
}

function duplicateNode (node, tree, cliProps, nodeFactory = DEFAULT_NODE_FACTORY) {
  const dupe = nodeFactory.taskNode(node)
  dupe.nodes = []

  tree.nodes.push(dupe)

  if (hasCompactTasks(cliProps)) {
    duplicateNodesFor(node, nonRecursiveDuplicateNode, dupe, nodeFactory)
  } else {
    const maximumDepth = getTasksDepth(cliProps)

    if (!maximumDepth || maximumDepth > 1) {
      duplicateNodesFor(node, recursiveDuplicateNode, dupe, maximumDepth, 2, nodeFactory)
    }
  }
}

function duplicateTree (tree = {}, cliProps = {}, nodeFactory = DEFAULT_NODE_FACTORY) {
  const dupe = nodeFactory.topNode(tree)
  dupe.nodes = []

  duplicateNodesFor(tree, duplicateNode, dupe, cliProps, nodeFactory)

  return dupe
}

export default duplicateTree
