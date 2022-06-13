import React from 'react'
import intl from 'react-intl-universal'
import { formatDateTime } from '../../../utils/helpers/date'
import { convertFromUint256 } from '../../../utils/helpers/mathOperations'
import { rewardsShpingLevels } from '../../pages/CampaignRewardsTab/consts'

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'ts',
    dataIndex: 'ts',
    title: intl.get('users.buddies.ts'),
    align: 'center',
    render: value => <span>{(value && formatDateTime(value)) || '-'}</span>
  },
  {
    key: 'first_name',
    dataIndex: 'first_name',
    title: intl.get('users.buddies.firstName'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'last_name',
    dataIndex: 'last_name',
    title: intl.get('users.buddies.lastName'),
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'level_type',
    dataIndex: 'level_type',
    title: intl.get('users.buddies.levelType'),
    align: 'center',
    render: value => (
      <span>
        {(value &&
          rewardsShpingLevels.find(item => item.value === value) &&
          rewardsShpingLevels.find(item => item.value === value).label) ||
          '-'}
      </span>
    )
  },
  {
    key: 'coins',
    dataIndex: 'coins',
    title: intl.get('users.buddies.coins'),
    align: 'center',
    render: value => <span>{(value && convertFromUint256(value)) || '-'}</span>
  }
]
