import intl from 'react-intl-universal'
import React from 'react'
import IconButton from '../../../molecules/IconButton'
import { copyToClipboard } from '../../../../utils/copyToClipBoard'

// eslint-disable-next-line import/prefer-default-export
export const columns = [
  {
    title: intl.get('supplyChain.actions'),
    dataIndex: 'actions',
    rowKey: 'actions',
    fieldId: 'actions',
    columnName: intl.get('supplyChain.actions'),
    align: 'center',
    render: (i, data) => (
      <IconButton
        type='Copy'
        styleParam={{ fontSize: 19 }}
        actionFunction={e => {
          e.preventDefault()
          e.stopPropagation()
          copyToClipboard(data.id)
        }}
      />
    )
  },
  {
    title: intl.get('supplyChain.name'),
    dataIndex: 'name',
    rowKey: 'name',
    fieldId: 'name',
    columnName: intl.get('supplyChain.name')
  },
  {
    title: intl.get('supplyChain.externalId'),
    dataIndex: 'external_id',
    rowKey: 'external_id',
    fieldId: 'external_id',
    columnName: intl.get('supplyChain.externalId')
  },
  {
    title: intl.get('supplyChain.country'),
    dataIndex: 'country',
    rowKey: 'country',
    fieldId: 'country',
    columnName: intl.get('supplyChain.country')
  }
]
