import intl from 'react-intl-universal'

export const defaultValues = {
  countries: [],
  accuracy: 800,
  address: undefined,
  city: undefined,
  country: undefined,
  latitude: undefined,
  longitude: undefined,
  name: undefined,
  post_code: undefined,
  state: undefined,
  sub_site_type: undefined,
  useLatLng: false
}

export const inputs = [
  {
    value: 'name',
    placeholder: intl.get('supplyChain.name')
  },
  {
    value: 'sub_site_type',
    placeholder: intl.get('supplyChain.type')
  },
  {
    value: 'address',
    placeholder: intl.get('supplyChain.address'),
    style: { flexBasis: '66%' }
  },
  {
    value: 'city',
    placeholder: intl.get('supplyChain.city')
  },
  {
    value: 'state',
    placeholder: intl.get('supplyChain.state')
  },
  {
    value: 'post_code',
    placeholder: intl.get('supplyChain.postCode')
  },
  {
    value: 'country',
    placeholder: intl.get('supplyChain.country')
  }
]
