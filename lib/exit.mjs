
// Fix stdout truncation on windows
export default function exit (code) {
  if (process.platform === 'win32' && process.stdout.writableLength) {
    process.stdout.once('drain', () => { process.exit(code) })
    return
  }
  process.exit(code)
}
