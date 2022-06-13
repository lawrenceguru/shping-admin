import React from 'react'
import intl from 'react-intl-universal'
import { StyledIcon } from './styles'

// const getKey = arr => sortBy(arr, {}, o => o).join('&')

const getSidebar = () => ({
  settings: [
    {
      title: intl.get('navigation.profile'),
      path: ['/admin/settings/profile'],
      icon: <StyledIcon type='profile' theme='filled' />
    },
    // {
    //   title: intl.get('navigation.plan'),
    //   path: !plans
    //     ? ['/admin/settings/plans']
    //     : ['/admin/settings/plans', ...plans.map(plan => `/admin/settings/plans/${plan}`)],
    //   icon: <StyledIcon type='star' theme='filled' />,
    //   access: 'security_admin',
    //   excludeType: 'expert'
    // },
    // {
    //   title: intl.get('navigation.payment'),
    //   path: ['/admin/settings/payment-history', '/admin/settings/payment-history/change-card'],
    //   icon: <StyledIcon type='shop' theme='filled' />,
    //   access: 'security_admin',
    //   excludeType: 'expert'
    // },
    {
      title: intl.get('navigation.index'),
      path: ['/admin/settings/index-fields'],
      icon: <StyledIcon type='database' theme='filled' />,
      access: 'security_admin'
    },
    {
      title: intl.get('navigation.myTeam'),
      path: ['/admin/settings/my-team'],
      icon: <StyledIcon type='usergroup-delete' />,
      access: 'security_admin'
    },
    {
      title: intl.get('navigation.integrations'),
      path: ['/admin/settings/integrations'],
      icon: <StyledIcon type='vertical-align-top' />,
      access: 'security_admin'
    }
  ]
})

// function getLinksSettings(role) {
//   const obj = {
//     // return profile settings tab
//     [getKey(['supply_chain'])]: []
//   }
//   return obj[getKey(role)] || getSidebar().settings
// }

export default () => [
  {
    title: intl.get('navigation.analytics'),
    path: [
      '/admin/analytics',
      '/admin/analytics-scans',
      '/admin/analytics-geography',
      '/admin/analytics-users',
      '/admin/analytics-alerts',
      '/admin/analytics-arr'
    ],
    icon: <StyledIcon type='pie-chart' theme='filled' />,
    access: 'report_viewer',
    plan: ['light', 'complete', 'complete+', 'corporate'],
    module: ['product360', 'serialization', 'supply_chain']
  },
  {
    title: intl.get('navigation.campaigns'),
    name: 'campaigns',
    path: [
      '/admin/campaigns',
      '/admin/campaigns-rewards',
      '/admin/campaigns-shoutouts',
      '/admin/campaigns-bot',
      '/admin/campaigns-boost',
      '/admin/campaigns-reminder',
      '/admin/campaigns-summary',
      '/admin/campaigns-summary/editor',
      '/admin/campaigns-summary/details'
    ],
    icon: <StyledIcon type='notification' />,
    access: 'rewards_admin',
    module: ['rewards']
  },
  {
    title: intl.get('navigation.reviews'),
    name: 'reviews',
    path: ['/admin/reviews', '/admin/reviews-templates', '/admin/reviews-templates/editor'],
    icon: <StyledIcon type='message' />,
    access: 'reviews_admin',
    module: ['rewards']
  },
  {
    title: intl.get('navigation.products'),
    path: ['/admin/products'],
    icon: <StyledIcon type='unordered-list' />,
    module: ['product360']
  },
  {
    title: intl.get('navigation.documents'),
    path: ['/admin/documents'],
    icon: <StyledIcon type='file-text' />,
    access: 'product_line',
    module: ['product360']
  },
  {
    title: intl.get('navigation.todo'),
    path: ['/admin/todo-cards'],
    icon: <StyledIcon type='unordered-list' />,
    module: ['todo_cards']
  },
  {
    title: intl.get('navigation.users'),
    path: ['/admin/users'],
    icon: <StyledIcon type='mobile' />,
    access: 'security_admin',
    systemOnly: true
  },
  {
    title: intl.get('navigation.trackAndTrace'),
    path: ['/admin/track-and-trace'],
    icon: <StyledIcon type='unordered-list' />,
    module: ['serialization', 'supply_chain']
  },
  {
    title: intl.get('navigation.customers'),
    path: ['/admin/customers'],
    icon: <StyledIcon type='user' />,
    access: 'security_admin',
    systemOnly: true
  },
  {
    title: intl.get('navigation.storecard'),
    path: ['/admin/store-cards'],
    icon: <StyledIcon type='credit-card' />,
    access: 'security_admin',
    systemOnly: true
  },
  {
    title: intl.get('navigation.cashout'),
    path: ['/admin/cashout'],
    icon: <StyledIcon type='dollar' />,
    access: 'cashout_admin',
    systemOnly: true
  },
  {
    title: intl.get('navigation.settings'),
    path: ['/admin/settings'],
    icon: <StyledIcon type='setting' theme='filled' />,
    config: {
      base: '/admin/settings',
      links: getSidebar().settings
    }
  }
]
