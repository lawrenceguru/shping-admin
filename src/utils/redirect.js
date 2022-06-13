const pages = [
  {
    url: '/admin/analytics',
    access: 'report_viewer'
  },
  {
    url: '/admin/contributors',
    access: 'contributors_moderator',
    systemAccess: true
  },
  {
    url: '/admin/reviews_admin',
    access: 'report_viewer'
  },
  {
    url: '/admin/campaigns-rewards',
    access: 'rewards_admin'
  },
  {
    url: '/admin/product-catalogue',
    access: 'product_line'
  }
]

export default (plan, { roles }, isSystem) => {
  if (!isSystem) {
    if (plan === 'light') {
      if (roles.includes('report_viewer')) return '/admin/analytics'
      if (roles.includes('reviews_admin')) return '/admin/reviews'
    } else if (!plan || plan === 'complete' || plan === 'complete+' || plan === 'corporate') {
      if (roles.includes('report_viewer')) return '/admin/analytics'
      if (roles.includes('rewards_admin')) return '/admin/campaigns-rewards'
      if (roles.includes('reviews_admin')) return '/admin/reviews'
    } else if (roles.includes('supply_chain')) {
      return '/admin/analytics'
    } else {
      return '/admin/product-catalogue'
    }
  }
  const pageRole = pages.find(p => roles.includes(p.access) && (!p.systemAccess || isSystem))

  return (pageRole && pageRole.url) || '/admin/product-catalogue'
}
