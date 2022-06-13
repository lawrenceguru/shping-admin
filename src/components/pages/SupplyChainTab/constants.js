import intl from 'react-intl-universal'
import React from 'react'
import styled from 'styled-components'
import IconButton from '../../molecules/IconButton'
import deleteModal from '../../molecules/DeleteModal'
import { copyToClipboard } from '../../../utils/copyToClipBoard'

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  & > div {
    margin-left: 10%;
  }
`

// eslint-disable-next-line import/prefer-default-export
export const columns = (
  history,
  deleteParticipant,
  editParticipant,
  supplyParticipantsLocations,
  selectParticipant
) => [
  {
    title: intl.get('supplyChain.actions'),
    dataIndex: 'actions',
    rowKey: 'actions',
    fieldId: 'actions',
    columnName: 'actions',
    render: (i, data) => (
      <ActionWrapper>
        <IconButton type='Copy' styleParam={{ fontSize: 19 }} actionFunction={() => copyToClipboard(data.id)} />
        <IconButton
          type='Edit'
          styleParam={{ fontSize: 19 }}
          actionFunction={() => {
            editParticipant({ data })
            history.push('/admin/track-and-trace/supply-chain/supply-form')
          }}
        />
        <IconButton
          type='MapMarker'
          styleParam={{ fontSize: 19 }}
          actionFunction={() => {
            selectParticipant({ id: data.id })
            editParticipant({ data })
            history.push('/admin/track-and-trace/supply-chain/locations')
          }}
        />
        {data && !data.api_key && (
          <IconButton
            type='Delete'
            styleParam={{ fontSize: 19 }}
            actionFunction={() =>
              deleteModal(
                () => deleteParticipant({ id: data.id, name: data.name }),
                intl.get('supplyChain.delete', { name: data.name })
              )
            }
          />
        )}
      </ActionWrapper>
    )
  },
  {
    title: intl.get('supplyChain.externalId'),
    dataIndex: 'external_id',
    rowKey: 'external_id',
    fieldId: 'external_id',
    columnName: intl.get('supplyChain.externalId')
  },
  {
    title: intl.get('supplyChain.gln'),
    dataIndex: 'gln',
    rowKey: 'gln',
    fieldId: 'gln',
    columnName: intl.get('supplyChain.gln')
  },
  {
    title: intl.get('supplyChain.name'),
    dataIndex: 'name',
    rowKey: 'name',
    fieldId: 'name',
    columnName: intl.get('supplyChain.name')
  },
  {
    title: intl.get('supplyChain.country'),
    dataIndex: 'country',
    rowKey: 'country',
    fieldId: 'country',
    columnName: intl.get('supplyChain.country')
  },
  {
    title: intl.get('supplyChain.city'),
    dataIndex: 'city',
    rowKey: 'city',
    fieldId: 'city',
    columnName: intl.get('supplyChain.city')
  },
  {
    title: intl.get('supplyChain.contact'),
    dataIndex: 'contact',
    rowKey: 'contact',
    fieldId: 'contact',
    columnName: intl.get('supplyChain.contact')
  },
  {
    title: intl.get('supplyChain.phone'),
    dataIndex: 'phone',
    rowKey: 'phone',
    fieldId: 'phone',
    columnName: intl.get('supplyChain.phone')
  },
  {
    title: intl.get('supplyChain.address'),
    dataIndex: 'address',
    rowKey: 'address',
    fieldId: 'address',
    columnName: intl.get('supplyChain.address')
  }
]
