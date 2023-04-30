
import replaceHomedir from 'replace-homedir'

export default function tildify (filePath) {
  return replaceHomedir(filePath, '~')
}
