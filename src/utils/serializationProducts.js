import intl from 'react-intl-universal'

const circulationStatusOptions = [
  {
    value: 'true',
    label: 'True'
  },
  {
    value: 'null',
    label: 'False'
  }
]

const statusOptions = [
  {
    value: 'deleted',
    label: 'Deleted'
  },
  {
    value: 'null',
    label: 'Ok'
  }
]

export const getAllFields = (defaults = [], customs = [], current = []) => {
  const result = [...current]
  const all = [
    ...defaults,
    ...customs,
    {
      fieldId: 'owner_select',
      fieldName: 'owner_select',
      columnName: 'Owner selector'
    }
  ]

  all.forEach(item => {
    const indexOfField = current.find(elem => elem.fieldId === item.fieldId)

    if (!indexOfField) {
      result.push({ ...item, isDisabled: false })
    }
  })

  return result.filter(item => !['custody', 'owner', 'issuer'].includes(item.fieldId))
}

export const getModifiedFields = (defaults = [], customs = [], current = []) => {
  const fields = getAllFields(defaults, customs, current)

  return fields.map(field => {
    if (field.fieldName === 'declaration_date') {
      return {
        ...field,
        type: 'datePicker',
        placeholder: intl.get('serializedProductsPage.placeholders.declarationDate'),
        format: 'YYYY-MM-DD'
      }
    }

    if (field.fieldName === 'invoiceDate') {
      return {
        ...field,
        type: 'datePicker',
        placeholder: intl.get('serializedProductsPage.placeholders.invoiceDate'),
        format: 'YYYY-MM-DD'
      }
    }

    if (field.fieldName === 'date_created') {
      return {
        ...field,
        type: 'datePicker',
        placeholder: intl.get('serializedProductsPage.placeholders.dateCreated'),
        format: 'YYYY-MM-DD'
      }
    }

    if (field.fieldId === 'into_circulation') {
      return {
        ...field,
        type: 'select',
        placeholder: field.columnName,
        options: circulationStatusOptions
      }
    }

    if (field.fieldId === 'circulation_status') {
      return {
        ...field,
        type: 'select',
        placeholder: field.columnName,
        options: statusOptions
      }
    }

    return {
      ...field
    }
  })
}
