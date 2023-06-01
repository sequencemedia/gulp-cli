import copyProps from 'copy-props'

const fromTo = {
  'flags.silent': 'silent',
  'flags.continue': 'continue',
  'flags.series': 'series',
  'flags.logLevel': 'logLevel',
  'flags.compactTasks': 'compactTasks',
  'flags.tasksDepth': 'tasksDepth',
  'flags.sortTasks': 'sortTasks'
}

export default function mergeConfigToCliFlags (cliProps, configProps) {
  return (
    copyProps(configProps, cliProps, fromTo, (configProps, cliProps) => {
      if (cliProps.value === undefined) {
        return configProps.value
      }
    })
  )
}
