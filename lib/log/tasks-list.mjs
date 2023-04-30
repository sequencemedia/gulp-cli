
export default function logTasksList ({ nodes = [] }) {
  console.log(nodes.join('\n').trim())
}
