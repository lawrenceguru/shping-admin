import React, { useCallback, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import * as ST from './styles'
import Button from '../../atoms/Button'
import Table from '../../molecules/Table'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import CustomPagination from '../../atoms/CustomPagination'
import useTariffs from '../../../data/billing/tariffs'

const TariffsList = ({ id }) => {
  const [paginationSize, setPaginationSize] = useState(10)
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)
  const { tariffs, error } = useTariffs(id)

  const history = useHistory()
  const columns = [
    {
      key: 'starts_at',
      dataIndex: 'starts_at',
      align: 'center',
      title: intl.get('tariff.tableHeader.start'),
      render: startsAt => {
        return moment(startsAt).format('YYYY-MM-DD')
      }
    },
    {
      key: 'created_at',
      dataIndex: 'created_at',
      align: 'center',
      title: intl.get('tariff.tableHeader.created'),
      render: createdAt => {
        return moment(createdAt).format('YYYY-MM-DD HH:mm')
      }
    },
    {
      key: 'Actions',
      align: 'center',
      title: intl.get('tariff.tableHeader.actions'),
      render: data => (
        <ST.Actions>
          <Button type='text' onClick={() => history.push(`/admin/customers/list/${id}/tariff-update/${data.id}`)}>
            View
          </Button>
        </ST.Actions>
      )
    }
  ]

  const isLoading =
    tariffs === undefined && error?.response?.data.status !== 500 && error?.response?.data.message !== 'missing'
  const totalCount = tariffs?.length || 0
  const handleAddTariff = useCallback(() => history.push(`/admin/customers/list/${id}/tariff-create`), [])
  const lastPage = Math.ceil(totalCount / paginationSize)
  const handleChangePaginationSize = size => {
    setCurrentPaginationPage(1)
    setPaginationSize(size)
  }
  const isEmpty = Array.isArray(tariffs) && tariffs.length === 0
  return (
    <ST.Wrapper>
      <ST.Header>Tariffs</ST.Header>
      <ST.ButtonWrapper>
        <Button type='danger' size='large' onClick={handleAddTariff}>
          {intl.get('tariff.buttonCreate')}
        </Button>
      </ST.ButtonWrapper>
      <TableHeaderOptions
        totalItems={totalCount}
        hasNotSort
        paginationSize={paginationSize}
        handleChangePaginationSize={handleChangePaginationSize}
      />
      <>
        {isEmpty ? (
          <>No Data</>
        ) : (
          <>
            <Table
              data={tariffs?.slice(
                (currentPaginationPage - 1) * paginationSize,
                currentPaginationPage * paginationSize
              )}
              loading={isLoading}
              columns={columns}
              rowKey='id'
            />
            {lastPage > 1 && (
              <CustomPagination
                currentPaginationPage={currentPaginationPage}
                paginationSize={paginationSize}
                handlePagination={page => setCurrentPaginationPage(page)}
                count={totalCount}
                lastPage={lastPage}
                size='small'
              />
            )}
          </>
        )}
      </>
    </ST.Wrapper>
  )
}
TariffsList.propTypes = {
  id: PropTypes.string
}

TariffsList.defaultProps = {
  id: null
}

export default TariffsList
