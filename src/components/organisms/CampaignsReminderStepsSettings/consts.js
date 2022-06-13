import intl from 'react-intl-universal'

export const reminderFrequencies = [
  { value: 'once', label: intl.get('campaigns.reminder.form.frequencies.once') },
  { value: 'daily', label: intl.get('campaigns.reminder.form.frequencies.daily') },
  { value: 'weekly', label: intl.get('campaigns.reminder.form.frequencies.weekly') },
  { value: 'monthly', label: intl.get('campaigns.reminder.form.frequencies.monthly') },
  { value: 'yearly', label: intl.get('campaigns.reminder.form.frequencies.yearly') },
  { value: 'working_days', label: intl.get('campaigns.reminder.form.frequencies.working_days') },
  { value: 'weekends', label: intl.get('campaigns.reminder.form.frequencies.weekends') },
  { value: 'custom', label: intl.get('campaigns.reminder.form.frequencies.custom') }
]

export const reminderCustomDays = [
  { value: '1', label: intl.get('days.monday') },
  { value: '2', label: intl.get('days.tuesday') },
  { value: '3', label: intl.get('days.wednesday') },
  { value: '4', label: intl.get('days.thursday') },
  { value: '5', label: intl.get('days.friday') },
  { value: '6', label: intl.get('days.saturday') },
  { value: '7', label: intl.get('days.sunday') }
]
