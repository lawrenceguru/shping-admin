import intl from 'react-intl-universal'

export const boostShpingLevels = [
  { value: 'bronze', label: intl.get('campaigns.rewards.form.levels.bronze') },
  { value: 'silver', label: intl.get('campaigns.rewards.form.levels.silver') },
  { value: 'gold', label: intl.get('campaigns.rewards.form.levels.gold') },
  { value: 'platinum', label: intl.get('campaigns.rewards.form.levels.platinum') }
]

export const boostMethodOptions = [
  { value: 'scan', label: intl.get('campaigns.boost.form.method.scan') },
  { value: 'invite', label: intl.get('campaigns.boost.form.method.invitation') }
]

export const boostBuddyInviteFirstOptions = [
  { value: 'none', label: intl.get('campaigns.boost.form.none') },
  { value: 'inc_level', label: intl.get('campaigns.boost.form.inc_level') },
  { value: 'bronze', label: intl.get('campaigns.rewards.form.levels.bronze') },
  { value: 'silver', label: intl.get('campaigns.rewards.form.levels.silver') },
  { value: 'gold', label: intl.get('campaigns.rewards.form.levels.gold') },
  { value: 'platinum', label: intl.get('campaigns.rewards.form.levels.platinum') }
]

export const boostBuddyInviteNextDayEndOptions = [
  { value: 'none', label: intl.get('campaigns.boost.form.none') },
  { value: 'next_day_end', label: intl.get('campaigns.boost.form.next_day_end') }
]

export const boostBuddyRepeatOptions = [
  { value: 'none', label: intl.get('campaigns.boost.form.none') },
  { value: 'inc_level', label: intl.get('campaigns.boost.form.inc_level') },
  { value: 'next_day_end', label: intl.get('campaigns.boost.form.next_day_end') }
]

export const boostBuddyRepeatPeriodOptions = [
  { value: 'last_date', label: intl.get('campaigns.boost.form.last_date') },
  { value: 'next_day_end', label: intl.get('campaigns.boost.form.next_day_end') }
]
