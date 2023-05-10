import archy from 'archy'

import sortBy from 'array-sort'
import isObject from 'isobject'

import logger from '#gulp-cli/lib/logger'
import ansi from '#gulp-cli/lib/ansi'
import getDuplicate from '#gulp-cli/lib/get-duplicate'

function getLineInfoCollector (lineInfo) {
  return {
    topTask (node) {
      lineInfo.push({
        name: node.label,
        desc: node.desc,
        type: 'top'
      })
    },
    option (opt) {
      lineInfo.push({
        name: opt.label,
        desc: opt.desc,
        type: 'option'
      })
    },
    childTask (node) {
      lineInfo.push({
        name: node.label,
        type: 'child'
      })
    }
  }
}

function getNodeFactory (getTask, entryObserver) {
  return {
    topNode (node) {
      return {
        label: node.label
      }
    },

    taskNode (node) {
      const task = getTask(node.label) || {}

      const newNode = {
        label: node.label,
        desc: typeof task.description === 'string' ? task.description : '',
        cliProps: []
      }
      entryObserver.topTask(newNode)

      if (isObject(task.flags)) {
        Object.keys(task.flags)
          .sort()
          .filter(Boolean)
          .forEach((flag) => {
            const opt = {
              label: flag,
              desc: typeof task.flags[flag] === 'string' ? task.flags[flag] : ''
            }
            entryObserver.option(opt)
            newNode.cliProps.push(opt)
            newNode.label += '\n' + opt.label // The way of archy for options.
          })
      }

      return newNode
    },

    childNode (node) {
      const newChild = {
        label: node.label
      }
      entryObserver.childTask(newChild)
      newChild.label = '' // Because don't use child tasks to calc indents.

      return newChild
    }
  }
}

function getSpacerForLineIndents (tree, lineInfo) {
  let maxSize = 0
  const sizes = []

  archy(tree)
    .split('\n')
    .slice(1, -1)
    .forEach((line, index) => {
      const info = lineInfo[index]
      if (info.type === 'top' || info.type === 'option') {
        maxSize = Math.max(maxSize, line.length)
        sizes.push(line.length)
      } else {
        sizes.push(0)
      }
    })

  maxSize += 3

  return function getSpacerFor (index) {
    return Array(maxSize - sizes[index]).join(' ')
  }
}

function getLinesContainingOnlyBranches (tree) {
  tree.nodes
    .forEach((node) => {
      node.label = ''
      node.cliProps
        .forEach(() => {
          node.label += '\n'
        })
    })

  return archy(tree)
    .split('\n')
    .slice(1, -1)
}

function logLines (lines, spacer, lineInfo) {
  lines
    .forEach((branch, index) => {
      const info = lineInfo[index]

      let line = ansi.white(branch)

      if (info.type === 'top') {
        line += ansi.cyan(info.name)
        if (info.desc.length > 0) {
          line += spacer(index) + ansi.white(info.desc)
        }
      } else if (info.type === 'option') {
        line += ansi.magenta(info.name)
        if (info.desc.length > 0) {
          line += spacer(index) + ansi.white('…' + info.desc)
        }
      } else { // If (info.type === 'child') {
        line += ansi.white(info.name)
      }

      logger.info(line)
    })
}

// Wire up logger tasks
export default function logTasks (tree, cliProps, getTask) {
  if (cliProps.sortTasks) {
    tree.nodes = sortBy(tree.nodes, 'label')
  }

  const lineInfo = []
  const entryObserver = getLineInfoCollector(lineInfo)
  const nodeFactory = getNodeFactory(getTask, entryObserver)

  const dupe = getDuplicate(tree, cliProps, nodeFactory)
  const spacer = getSpacerForLineIndents(dupe, lineInfo)
  const lines = getLinesContainingOnlyBranches(dupe)

  logger.info(dupe.label)
  logLines(lines, spacer, lineInfo)
}
