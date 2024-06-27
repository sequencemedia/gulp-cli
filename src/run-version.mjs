import {
  pathToFileURL
} from 'node:url'

import {
  join
} from 'node:path'

import exit from './exit.mjs'

import ROOT from '#where-am-i'

async function getGulpCliVersion () {
  const fileUrl = pathToFileURL(join(ROOT, 'package.json'))

  const {
    default: {
      version
    }
  } = await import(fileUrl, { with: { type: 'json' } })

  return version
}

function getGulpVersion ({ modulePackage: { version = 'unknown' } = {} }) {
  return version
}

export default async function runVersion (envProps) {
  console.log(`Gulp CLI version: ${await getGulpCliVersion()}`)
  console.log(`Gulp version: ${getGulpVersion(envProps)}`)
  exit(0)
}
