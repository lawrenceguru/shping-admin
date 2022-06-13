import React from 'react'
import { Icon } from 'antd'
import intl from 'react-intl-universal'

const trueIcon = <Icon type='check' />
const falseIcon = <Icon type='minus' />
export const columns = [
  {
    title: intl.get('myTeamPage.create.productRole'),
    dataIndex: 'role'
  },
  {
    title: intl.get('myTeamPage.create.reviews'),
    dataIndex: 'reviews',
    align: 'center',
    render: reviews => (reviews ? trueIcon : falseIcon)
  },
  {
    title: intl.get('myTeamPage.create.managePayments'),
    dataIndex: 'payments',
    align: 'center',
    render: payments => (payments ? trueIcon : falseIcon)
  },
  {
    title: intl.get('myTeamPage.create.addEditProducts'),
    dataIndex: 'addEditProducts',
    align: 'center',
    render: addEditProducts => (addEditProducts ? trueIcon : falseIcon)
  },
  {
    title: intl.get('myTeamPage.create.deleteProducts'),
    dataIndex: 'deleteProducts',
    align: 'center',
    render: deleteProducts => (deleteProducts ? trueIcon : falseIcon)
  },
  {
    title: intl.get('myTeamPage.create.setUpCampaigns'),
    dataIndex: 'campaigns',
    align: 'center',
    render: campaigns => (campaigns ? trueIcon : falseIcon)
  },
  {
    title: intl.get('myTeamPage.create.tTOperator'),
    dataIndex: 'ttOperator',
    align: 'center',
    render: ttOperator => (ttOperator ? trueIcon : falseIcon)
  }
]

export const roles = [
  {
    role: 'Admin',
    moderator: false,
    reviews: true,
    payments: true,
    addEditProducts: true,
    deleteProducts: true,
    campaigns: true,
    ttOperator: true,
    key: 'Admin'
  },
  {
    role: 'Content Writer',
    moderator: false,
    reviews: false,
    payments: false,
    addEditProducts: true,
    deleteProducts: true,
    campaigns: true,
    ttOperator: false,
    key: 'Content Writer'
  },
  {
    role: 'Moderator',
    moderator: true,
    reviews: false,
    payments: false,
    addEditProducts: false,
    deleteProducts: false,
    campaigns: false,
    ttOperator: false,
    key: 'Moderator'
  },
  {
    role: 'T&T Operator',
    moderator: true,
    reviews: true,
    payments: true,
    addEditProducts: false,
    deleteProducts: true,
    campaigns: true,
    ttOperator: true,
    key: 'T&T Operator'
  }
]
