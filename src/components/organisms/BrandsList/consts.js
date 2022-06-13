import React from 'react'
import { LogoWrapper } from './styles'
// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    key: 'logo',
    dataIndex: 'logo',
    title: '',
    align: 'left',
    render: value =>
      value ? (
        <LogoWrapper>
          <img src={value} alt='Brand logo' />
        </LogoWrapper>
      ) : (
        ''
      )
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Name',
    align: 'center',
    render: value => <span>{value || '-'}</span>
  },
  {
    key: 'budget',
    dataIndex: 'budget',
    title: 'Budget',
    align: 'center',
    render: value => <span>{value ? `$${value}.00` : '-'}</span>
  }
]
