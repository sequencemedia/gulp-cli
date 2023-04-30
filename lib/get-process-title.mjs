
export default function getProcessTitle (argv = []) {
  return ['gulp'].concat(argv).join(' ').trim()
}
