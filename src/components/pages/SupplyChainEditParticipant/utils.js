import intl from 'react-intl-universal'

// eslint-disable-next-line import/prefer-default-export
export const inputs = [
  {
    value: 'select_type',
    placeholder: intl.get('supplyChain.selectType')
  },
  {
    value: 'external_id',
    placeholder: intl.get('supplyChain.externalId')
  },
  {
    value: 'gln',
    placeholder: intl.get('supplyChain.gln')
  },
  {
    value: 'name',
    placeholder: intl.get('supplyChain.name')
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
  },
  {
    value: 'contact',
    placeholder: intl.get('supplyChain.contact')
  },
  {
    value: 'phone',
    placeholder: intl.get('supplyChain.phone')
  },
  {
    value: 'email',
    placeholder: intl.get('supplyChain.email')
  },
  {
    value: 'facebook',
    placeholder: intl.get('supplyChain.facebook')
  }
]
