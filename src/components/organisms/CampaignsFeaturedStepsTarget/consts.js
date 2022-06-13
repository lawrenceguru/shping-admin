import intl from 'react-intl-universal'
// eslint-disable-next-line import/prefer-default-export
import { rewardsShpingLevels } from '../../pages/CampaignRewardsTab/consts'

// eslint-disable-next-line import/prefer-default-export
export const fields = [
  {
    name: 'audience',
    type: 'audience'
  },
  {
    name: 'audience.user_levels',
    type: 'grouped',
    label: intl.get('campaigns.featured.audience.levels'),
    options: rewardsShpingLevels
  }
]
