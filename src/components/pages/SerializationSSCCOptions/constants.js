import intl from 'react-intl-universal'

// eslint-disable-next-line import/prefer-default-export
export const inputs = [
  {
    value: 'count',
    placeholder: 'SSCC'
  },
  {
    value: 'company_prefix',
    placeholder: intl.get('serializationTasks.serializationSSCCOptions.lastStep.compPrefix')
  }
]

export const inputsGenerator = [
  {
    value: 'sequence',
    placeholder: intl.get('serializationTasks.serializationSSCCOptions.firstStep.order')
  },
  {
    value: 'serial_number',
    placeholder: intl.get('serializationTasks.serializationSSCCOptions.firstStep.serialNumber')
  }
]

export const optionsOrder = [
  { value: 'random', label: intl.get('serializationTasks.serializationSSCCOptions.firstStep.random') },
  { value: 'ordered', label: intl.get('serializationTasks.serializationSSCCOptions.firstStep.ordered') }
]
