import intl from 'react-intl-universal'

const STATIC_IMAGE_URL = 'https://www.shping.com/static/media/'

export const subSiteType = [
  { value: '201', label: intl.get('supplyChainLocations.subSiteType.backRoom') },
  { value: '202', label: intl.get('supplyChainLocations.subSiteType.storageArea') },
  { value: '203', label: intl.get('supplyChainLocations.subSiteType.salesFloor') },
  { value: '207', label: intl.get('supplyChainLocations.subSiteType.returnArea') },
  { value: '208', label: intl.get('supplyChainLocations.subSiteType.productionArea') },
  { value: '209', label: intl.get('supplyChainLocations.subSiteType.receivingArea') },
  { value: '210', label: intl.get('supplyChainLocations.subSiteType.shippingArea') },
  { value: '211', label: intl.get('supplyChainLocations.subSiteType.salesFloorTransitionArea') },
  { value: '212', label: intl.get('supplyChainLocations.subSiteType.customerPickupArea') },
  { value: '213', label: intl.get('supplyChainLocations.subSiteType.yard') },
  { value: '214', label: intl.get('supplyChainLocations.subSiteType.containerDeck') },
  { value: '215', label: intl.get('supplyChainLocations.subSiteType.cargoTerminal') },
  { value: '251', label: intl.get('supplyChainLocations.subSiteType.packagingArea') },
  { value: '252', label: intl.get('supplyChainLocations.subSiteType.pickingArea') },
  { value: '253', label: intl.get('supplyChainLocations.subSiteType.pharmacyArea') },
  { value: '299', label: intl.get('supplyChainLocations.subSiteType.undefined') }
]

export const MonthsEnum = {
  1: 'january',
  2: 'february',
  3: 'march',
  4: 'april',
  5: 'may',
  6: 'june',
  7: 'july',
  8: 'august',
  9: 'september',
  10: 'october',
  11: 'november',
  12: 'december'
}

export const icons = [
  {
    description: intl.get('widgets.popup.options.action'),
    url: `${STATIC_IMAGE_URL}action.5d525172.svg`,
    value: 'action'
  },
  {
    description: intl.get('widgets.popup.options.brand'),
    url: `${STATIC_IMAGE_URL}brand.b7fc29f9.svg`,
    value: 'brand'
  },
  {
    description: intl.get('widgets.popup.options.contact'),
    url: `${STATIC_IMAGE_URL}contact.8f714a3e.svg`,
    value: 'contact'
  },
  {
    description: intl.get('widgets.popup.options.fb'),
    url: `${STATIC_IMAGE_URL}fb.4811f932.svg`,
    value: 'fb'
  },
  {
    description: intl.get('widgets.popup.options.support'),
    url: `${STATIC_IMAGE_URL}support.cf4cddf7.svg`,
    value: 'support'
  },
  {
    description: intl.get('widgets.popup.options.verify'),
    url: `${STATIC_IMAGE_URL}verify.0dcc69de.svg`,
    value: 'verify'
  },
  {
    description: intl.get('widgets.popup.options.warning'),
    url: `${STATIC_IMAGE_URL}warning.f172e7c5.svg`,
    value: 'warning'
  },
  {
    description: intl.get('widgets.popup.options.custom'),
    value: 'custom'
  }
]

export const name = localStorage.getItem('lang') === 'en' ? 'name' : `name_${localStorage.getItem('lang')}`
export const nameType = localStorage.getItem('lang') === 'en' ? 'text' : `text_${localStorage.getItem('lang')}`
