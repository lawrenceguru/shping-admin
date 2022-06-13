import intl from 'react-intl-universal'

export const widgetOptions = [
  { value: 'certificates', label: 'Certificates' },
  { value: 'gdti', label: 'GDTI' },
  { value: 'image', label: 'Image' },
  { value: 'link', label: 'Link' },
  { value: 'social_networks', label: 'Social networks' },
  { value: 'text', label: 'Text' },
  { value: 'video', label: 'Video' }
]

export const fieldsAttributes = {
  gdti: [{ value: 'gdti', label: 'GDTI' }],
  certificates: [
    { value: 'title', label: 'Title' },
    { value: 'img_url', label: 'Image url' },
    { value: 'gdti', label: 'GDTI' }
  ],
  video: [
    { value: 'title', label: 'Title' },
    { value: 'url', label: 'Url' },
    { value: 'preview', label: 'Preview' }
  ],
  social_networks: [
    { value: 'icon', label: 'Icon' },
    { value: 'url', label: 'Url' }
  ],
  link: [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image url' },
    { value: 'url', label: 'Link url' }
  ],
  text: [
    { value: 'title', label: 'Title' },
    { value: 'text', label: 'Text' }
  ],
  image: [{ value: 'url', label: 'Url' }]
}

export const columns = [
  intl.get('importProducts.mapping.otherColumns.import'),
  intl.get('importProducts.mapping.otherColumns.widgetGroup'),
  intl.get('importProducts.mapping.otherColumns.widget'),
  intl.get('importProducts.mapping.otherColumns.csvColumn'),
  intl.get('importProducts.mapping.otherColumns.field'),
  intl.get('importProducts.mapping.otherColumns.options'),
  intl.get('importProducts.mapping.otherColumns.position')
]
