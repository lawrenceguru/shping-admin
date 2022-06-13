import intl from 'react-intl-universal'

const reviewsStatusOptions = [
  { value: 'open', label: intl.get('reviews.status.opened') },
  { value: 'approve', label: intl.get('reviews.status.approved') },
  { value: 'reject', label: intl.get('reviews.status.rejected') },
  { value: 'report', label: intl.get('reviews.status.reported') },
  { value: 'delete', label: intl.get('reviews.status.deleted') }
]

export const fieldsForMainPanelAdvanced = [
  {
    fieldId: 'user_name',
    placeholder: intl.get('reviews.usernamePlaceholder')
  },
  {
    fieldId: 'gtin',
    type: 'inputNumber',
    placeholder: intl.get('reviews.gtinPlaceholder')
  }
]

export const optionsForFilters = [
  {
    fieldId: 'tags',
    type: 'tags',
    placeholder: intl.get('reviews.tags.placeholder'),
    mode: 'multiple'
  },
  {
    fieldId: 'statuses',
    type: 'select',
    mode: 'multiple',
    placeholder: intl.get('reviews.statusPlaceholder'),
    options: reviewsStatusOptions
  }
]

export const defaultInitialStateFilters = {
  user_name: {
    value: '',
    option: true
  },
  gtin: {
    value: '',
    option: true
  },
  statuses: {
    value: ['open', 'report'],
    option: true
  }
}
