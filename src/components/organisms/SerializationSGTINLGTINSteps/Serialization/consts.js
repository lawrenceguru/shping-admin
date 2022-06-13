import intl from 'react-intl-universal'

export const optionsType = [
  { value: 'sgtin', label: 'SGTIN' },
  { value: 'lgtin', label: 'LGTIN' }
]
export const optionsCode = [
  { value: 'gs1', label: intl.get('serializationTasks.serializationSSCCOptions.firstStep.GS1key') },
  { value: 'epc', label: 'EPC' }
]
export const optionsDataType = [
  { value: 'numeric', label: intl.get('serializationTasks.serializationSSCCOptions.firstStep.numeric') },
  { value: 'alphanumeric', label: intl.get('serializationTasks.serializationSSCCOptions.firstStep.alphanumeric') }
]
export const optionsOrder = [
  { value: 'random', label: intl.get('serializationTasks.serializationSSCCOptions.firstStep.random') },
  { value: 'ordered', label: intl.get('serializationTasks.serializationSSCCOptions.firstStep.ordered') }
]

export const attributeType = index => [
  { value: '11', label: intl.get('serializationTasks.serializationStep.attributeType.prodDate'), index },
  { value: '12', label: intl.get('serializationTasks.serializationStep.attributeType.dueDate'), index },
  { value: '13', label: intl.get('serializationTasks.serializationStep.attributeType.packDate'), index },
  { value: '15', label: intl.get('serializationTasks.serializationStep.attributeType.bestBeforeOrBestBy'), index },
  { value: '16', label: intl.get('serializationTasks.serializationStep.attributeType.sellBy'), index },
  { value: '17', label: intl.get('serializationTasks.serializationStep.attributeType.useByOrExpiry'), index },
  { value: '91', label: intl.get('serializationTasks.serializationStep.attributeType.internal', { value: 91 }), index },
  { value: '92', label: intl.get('serializationTasks.serializationStep.attributeType.internal', { value: 92 }), index },
  { value: '93', label: intl.get('serializationTasks.serializationStep.attributeType.internal', { value: 93 }), index },
  { value: '94', label: intl.get('serializationTasks.serializationStep.attributeType.internal', { value: 94 }), index },
  { value: '95', label: intl.get('serializationTasks.serializationStep.attributeType.internal', { value: 95 }), index },
  { value: '96', label: intl.get('serializationTasks.serializationStep.attributeType.internal', { value: 96 }), index },
  { value: '97', label: intl.get('serializationTasks.serializationStep.attributeType.internal', { value: 97 }), index },
  { value: '98', label: intl.get('serializationTasks.serializationStep.attributeType.internal', { value: 98 }), index },
  { value: '99', label: intl.get('serializationTasks.serializationStep.attributeType.internal', { value: 99 }), index },
  { value: '240', label: intl.get('serializationTasks.serializationStep.attributeType.additionalId'), index },
  { value: '310', label: intl.get('serializationTasks.serializationStep.attributeType.netWeightKg'), index },
  { value: '311', label: intl.get('serializationTasks.serializationStep.attributeType.lengthM'), index },
  { value: '312', label: intl.get('serializationTasks.serializationStep.attributeType.widthM'), index },
  { value: '313', label: intl.get('serializationTasks.serializationStep.attributeType.heightM'), index },
  { value: '314', label: intl.get('serializationTasks.serializationStep.attributeType.areaM2'), index },
  { value: '315', label: intl.get('serializationTasks.serializationStep.attributeType.netVolumeI'), index },
  { value: '316', label: intl.get('serializationTasks.serializationStep.attributeType.netVolumeM3'), index },
  { value: '320', label: intl.get('serializationTasks.serializationStep.attributeType.netWeightB'), index },
  { value: '321', label: intl.get('serializationTasks.serializationStep.attributeType.lengthI'), index },
  { value: '322', label: intl.get('serializationTasks.serializationStep.attributeType.lengthF'), index },
  { value: '323', label: intl.get('serializationTasks.serializationStep.attributeType.lengthY'), index },
  { value: '324', label: intl.get('serializationTasks.serializationStep.attributeType.widthI'), index },
  { value: '325', label: intl.get('serializationTasks.serializationStep.attributeType.widthF'), index },
  { value: '326', label: intl.get('serializationTasks.serializationStep.attributeType.widthY'), index },
  { value: '327', label: intl.get('serializationTasks.serializationStep.attributeType.heightI'), index },
  { value: '328', label: intl.get('serializationTasks.serializationStep.attributeType.heightF'), index },
  { value: '329', label: intl.get('serializationTasks.serializationStep.attributeType.heightY'), index },
  { value: '330', label: intl.get('serializationTasks.serializationStep.attributeType.grossWeightKg'), index },
  { value: '331', label: intl.get('serializationTasks.serializationStep.attributeType.lengthMLog'), index },
  { value: '332', label: intl.get('serializationTasks.serializationStep.attributeType.widthMLog'), index },
  { value: '333', label: intl.get('serializationTasks.serializationStep.attributeType.heightMLog'), index },
  { value: '334', label: intl.get('serializationTasks.serializationStep.attributeType.areaM2Log'), index },
  { value: '335', label: intl.get('serializationTasks.serializationStep.attributeType.volumneILog'), index },
  { value: '336', label: intl.get('serializationTasks.serializationStep.attributeType.volumeM3Log'), index },
  { value: '337', label: intl.get('serializationTasks.serializationStep.attributeType.kgPerM2'), index },
  { value: '340', label: intl.get('serializationTasks.serializationStep.attributeType.grossWeightLb'), index },
  { value: '341', label: intl.get('serializationTasks.serializationStep.attributeType.lengthILog'), index },
  { value: '342', label: intl.get('serializationTasks.serializationStep.attributeType.lengthFLog'), index },
  { value: '343', label: intl.get('serializationTasks.serializationStep.attributeType.lengthYLog'), index },
  { value: '344', label: intl.get('serializationTasks.serializationStep.attributeType.widthILog'), index },
  { value: '345', label: intl.get('serializationTasks.serializationStep.attributeType.widthFLog'), index },
  { value: '346', label: intl.get('serializationTasks.serializationStep.attributeType.widthYLog'), index },
  { value: '347', label: intl.get('serializationTasks.serializationStep.attributeType.heightILog'), index },
  { value: '348', label: intl.get('serializationTasks.serializationStep.attributeType.heightFLog'), index },
  { value: '349', label: intl.get('serializationTasks.serializationStep.attributeType.heightYLog'), index },
  { value: '350', label: intl.get('serializationTasks.serializationStep.attributeType.areaI2'), index },
  { value: '351', label: intl.get('serializationTasks.serializationStep.attributeType.areaF2'), index },
  { value: '352', label: intl.get('serializationTasks.serializationStep.attributeType.areaY2'), index },
  { value: '353', label: intl.get('serializationTasks.serializationStep.attributeType.areaI2Log'), index },
  { value: '354', label: intl.get('serializationTasks.serializationStep.attributeType.areaF2Log'), index },
  { value: '355', label: intl.get('serializationTasks.serializationStep.attributeType.areaY2Log'), index },
  { value: '356', label: intl.get('serializationTasks.serializationStep.attributeType.netWeightT'), index },
  { value: '357', label: intl.get('serializationTasks.serializationStep.attributeType.netVolumeOz'), index },
  { value: '360', label: intl.get('serializationTasks.serializationStep.attributeType.netVolumeQ'), index },
  { value: '361', label: intl.get('serializationTasks.serializationStep.attributeType.netVolumeG'), index },
  { value: '362', label: intl.get('serializationTasks.serializationStep.attributeType.volumeQLog'), index },
  { value: '363', label: intl.get('serializationTasks.serializationStep.attributeType.volumeGLog'), index },
  { value: '364', label: intl.get('serializationTasks.serializationStep.attributeType.volumeI3'), index },
  { value: '365', label: intl.get('serializationTasks.serializationStep.attributeType.volumeF3'), index },
  { value: '366', label: intl.get('serializationTasks.serializationStep.attributeType.volumeY3'), index },
  { value: '367', label: intl.get('serializationTasks.serializationStep.attributeType.volumeI3Log'), index },
  { value: '368', label: intl.get('serializationTasks.serializationStep.attributeType.volumeF3Log'), index },
  { value: '369', label: intl.get('serializationTasks.serializationStep.attributeType.volumeY3Log'), index }
]
