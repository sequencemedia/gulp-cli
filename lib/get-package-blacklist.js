'use strict'

const matchdep = require('matchdep')

/**
 * Given a collection of plugin names verifies this collection against
 * the blacklist. Returns an object with:
 * [plugin name]=>[blacklisting reason]
 * or an empty object if none of the dependencies to check are blacklisted.
 *
 * @param packageJson - The package JSON
 * @param blacklistJson - The blacklist JSON
 */
function getPackageBlacklist (packageJson, blacklistJson) {
  return (
    matchdep
      .filterAll(Object.keys(blacklistJson), packageJson)
      .reduce((blacklist, dependency) => {
        blacklist[dependency] = blacklistJson[dependency]
        return blacklist
      }, {})
  )
}

module.exports = getPackageBlacklist
