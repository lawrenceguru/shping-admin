export const typeOptions = [
  {
    label: 'Coins',
    value: 'coins'
  },
  {
    label: 'Percentages',
    value: 'percentages'
  }
]

export const sourceOptions = [
  {
    label: 'Invoice',
    value: 'invoice'
  },
  {
    label: 'Balance',
    value: 'balance'
  }
]

export const statusOptions = [
  {
    label: 'Active',
    value: 'active'
  },
  {
    label: 'Inactive',
    value: 'inactive'
  }
]

export const options = {
  type: typeOptions,
  source: sourceOptions,
  status: statusOptions
}

export const fields = ['type', 'feeValue', 'source', 'status']
