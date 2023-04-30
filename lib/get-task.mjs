
import isObject from 'isobject'

function isString (value) {
  return typeof value === 'string'
}

function isFunction (value) {
  return value instanceof Function
}

function getDescription (task = {}) {
  if (isString(task.description)) {
    return task.description
  }

  if (isFunction(task.unwrap)) {
    return getDescription(task.unwrap())
  }
}

function getFlags (task = {}) {
  if (isObject(task.flags)) {
    return task.flags
  }

  if (isFunction(task.unwrap)) {
    return getFlags(task.unwrap())
  }
}

function getTask (gulp) {
  return function getTaskFor (name) {
    const task = gulp.task(name)
    return {
      description: getDescription(task),
      flags: getFlags(task)
    }
  }
}

export default getTask
