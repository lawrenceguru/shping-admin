import intl from 'react-intl-universal'
// eslint-disable-next-line import/prefer-default-export
export const fields = [
  {
    name: 'name',
    type: 'input',
    label: intl.get('campaigns.featured.settings.nameHeader'),
    placeholder: intl.get('campaigns.featured.settings.namePlaceholder'),
    rules: { required: intl.get('todo.cards.form.required') }
  },
  [
    {
      name: 'dates',
      type: 'rangePicker',
      label: intl.get('campaigns.featured.settings.dateHeader'),
      rules: { validate: value => (!value || !value.length ? intl.get('todo.cards.form.required') : true) },
      basis: '70%'
    },
    {
      name: 'run_time',
      type: 'timePicker',
      label: intl.get('campaigns.featured.settings.runtimeHeader'),
      placeholder: intl.get('campaigns.featured.settings.runtimePlaceholder'),
      rules: { required: intl.get('todo.cards.form.required') },
      justify: 'flex-end',
      basis: '20%'
    }
  ],
  {
    name: 'options',
    type: 'switch',
    label: intl.get('campaigns.featured.settings.options'),
    placeholder: intl.get('campaigns.featured.settings.evenDisrtibution')
  },
  {
    name: 'hero_image_url',
    type: 'singleImage',
    label: intl.get('campaigns.featured.settings.heroImage')
  },
  {
    name: 'products',
    type: 'products',
    label: intl.get('campaigns.featured.settings.productsHeader'),
    placeholder: intl.get('campaigns.featured.settings.productsPlaceholder'),
    rules: { validate: value => (!value || !value.length ? intl.get('todo.cards.form.required') : true) }
  }
]
