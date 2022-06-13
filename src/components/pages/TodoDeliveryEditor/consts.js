import intl from 'react-intl-universal'

export const RADIO_GROUP_MODE = [
  { label: intl.get('todo.deliveries.form.deliveryMode.inFuture'), value: 'delayed' },
  { label: intl.get('todo.deliveries.form.deliveryMode.immediate'), value: 'immediate' },
  { label: intl.get('todo.deliveries.form.deliveryMode.inPast'), value: 'delayPast' }
]

export const RADIO_GROUP_PRODUCT = [
  { label: intl.get('todo.deliveries.form.productsOption1'), value: 'all' },
  { label: intl.get('todo.deliveries.form.productsOption2'), value: 'choose' }
]

export const RADIO_GROUP_GENDER = [
  { label: intl.get('todo.deliveries.form.genderOptionAny'), value: 'any' },
  { label: intl.get('todo.deliveries.form.genderOptionMale'), value: 'male' },
  { label: intl.get('todo.deliveries.form.genderOptionFemale'), value: 'female' },
  { label: intl.get('todo.deliveries.form.genderOptionOther'), value: 'other' }
]

export const RADIO_GROUP_DELIVERY_TIME = [
  {
    value: 'immediately',
    label: intl.get('todo.deliveries.form.dateDeliveryHeader1')
  },
  {
    value: 'setData',
    label: intl.get('todo.deliveries.form.dateDeliveryHeader2')
  }
]

export const AGE_MARKS = {
  0: '-',
  13: intl.get('todo.deliveries.form.filters.ageRange.main', { age: 13 }),
  18: intl.get('todo.deliveries.form.filters.ageRange.main', { age: 18 }),
  25: intl.get('todo.deliveries.form.filters.ageRange.main', { age: 25 }),
  35: intl.get('todo.deliveries.form.filters.ageRange.main', { age: 35 }),
  45: intl.get('todo.deliveries.form.filters.ageRange.main', { age: 45 }),
  55: intl.get('todo.deliveries.form.filters.ageRange.main', { age: 55 }),
  65: intl.get('todo.deliveries.form.filters.ageRange.main', { age: 65 }),
  75: '∞'
}

export const TYPE_REGISTRATION = [
  {
    value: 'facebook',
    label: intl.get('todo.deliveries.form.registrationOption1'),
    summary: intl.get('todo.deliveries.form.registrationSummary1')
  },
  {
    value: 'email',
    label: intl.get('todo.deliveries.form.registrationOption2'),
    summary: intl.get('todo.deliveries.form.registrationSummary2')
  }
]
