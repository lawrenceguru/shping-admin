import React, { useCallback, useEffect, useState } from 'react'
import intl from 'react-intl-universal'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { SHOPPINGLISTS_API } from 'constants/url'
import SwitchOption from '../../atoms/SwitchOption'
import * as ST from './styles'
import Button from '../../atoms/Button'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import Loader from '../../templates/Loader'
import Table from '../../molecules/Table'
import CustomPagination from '../../atoms/CustomPagination'
import useAds from '../../../data/shoppinglists/advertisement'
import useAdsSettings from '../../../data/shoppinglists/advertisement/settings'
import IconButton from '../../molecules/IconButton'
import deleteModal from '../../molecules/DeleteModal'
import { remove, updateAction } from '../../organisms/ShippingListAdForm/actions'

const ShoppingListAdsTab = () => {
  const ticket = useSelector(({ identity }) => identity.ticket)
  const participant = useSelector(({ identity }) => identity.current_participant)
  const { result, mutate } = useAdsSettings(participant)
  const [paginationSize, setPaginationSize] = useState(10)
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1)
  const { data: results, ads, total, mutate: mutateAction } = useAds(
    (currentPaginationPage - 1) * paginationSize,
    paginationSize
  )
  const handleDeleteAd = item => {
    remove(item, ticket, mutateAction)
  }
  const showConfirm = item => {
    deleteModal(() => handleDeleteAd(item), intl.get('campaigns.shoppingListAds.deleteConfirm', { name: item.name }))
  }
  const columns = [
    {
      key: 'switch',
      align: 'center',
      render: data => (
        <ST.SwitchFieldWrapper>
          <SwitchOption
            checked={data && data.status.toLowerCase() === 'active'}
            onChange={(value, event) => {
              event.preventDefault()
              event.stopPropagation()
              updateAction(data, ticket, mutateAction)
            }}
          />
        </ST.SwitchFieldWrapper>
      )
    },
    {
      key: 'name',
      dataIndex: 'name',
      align: 'center',
      title: intl.get('campaigns.shoppingListAds.tableHeader.name')
    },
    {
      key: 'type',
      dataIndex: 'type',
      align: 'center',
      title: intl.get('campaigns.shoppingListAds.tableHeader.type')
    },
    {
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      title: intl.get('campaigns.shoppingListAds.tableHeader.status')
    },
    {
      key: 'Delete',
      align: 'center',
      render: data => (
        <ST.DeleteIcon>
          <IconButton
            type='DeleteTrash'
            actionFunction={e => {
              e.stopPropagation()
              e.preventDefault()
              showConfirm(data)
            }}
          />
        </ST.DeleteIcon>
      )
    }
  ]

  const [settings, setSetting] = useState({
    category_top_ad: false,
    category_top_listing: false,
    keyword_top_ad: false,
    keyword_top_listing: false,
    main_page_ad: false
  })
  useEffect(() => {
    if (result) {
      setSetting(result.display_options.participant_settings)
    }
  }, [result])
  const isLoading = ads === undefined
  const totalCount = total || 0
  const history = useHistory()
  const handleAddAd = useCallback(() => history.push('/admin/campaigns/shopping-list-ads/create'), [])
  const lastPage = Math.ceil(totalCount / paginationSize)
  const handleChangeShoppinglistsSetting = (checked, key) => {
    axios
      .post(
        `${SHOPPINGLISTS_API}/advertisement/settings/${participant}`,
        {
          type: 'participant_settings',
          settings: { ...settings, [key]: checked }
        },
        {
          headers: {
            authenticateit_identity_ticket: ticket
          }
        }
      )
      .then(() => {
        mutate(`${SHOPPINGLISTS_API}/advertisement/settings/${participant}`)
      })
  }
  const handleChangePaginationSize = size => {
    setCurrentPaginationPage(1)
    setPaginationSize(size)
  }
  const handleClickRow = record => {
    // eslint-disable-next-line no-underscore-dangle
    history.push(`/admin/campaigns/shopping-list-ads/${record._id}`)
  }
  const isEmpty = Array.isArray(results) && results.length === 0

  return (
    <ST.Wrapper>
      <div>
        <ST.SwitchFieldWrapper>
          <SwitchOption
            text={intl.get('customer.filters.category_top_ad')}
            checked={settings.category_top_ad}
            onChange={(value, event) => {
              event.preventDefault()
              event.stopPropagation()
              handleChangeShoppinglistsSetting(value, 'category_top_ad')
            }}
          />
          <SwitchOption
            text={intl.get('customer.filters.category_top_listing')}
            checked={settings.category_top_listing}
            onChange={(value, event) => {
              event.preventDefault()
              event.stopPropagation()
              handleChangeShoppinglistsSetting(value, 'category_top_listing')
            }}
          />
          <SwitchOption
            text={intl.get('customer.filters.keyword_top_ad')}
            checked={settings.keyword_top_ad}
            onChange={(value, event) => {
              event.preventDefault()
              event.stopPropagation()
              handleChangeShoppinglistsSetting(value, 'keyword_top_ad')
            }}
          />
          <SwitchOption
            text={intl.get('customer.filters.keyword_top_listing')}
            checked={settings.keyword_top_listing}
            onChange={(value, event) => {
              event.preventDefault()
              event.stopPropagation()
              handleChangeShoppinglistsSetting(value, 'keyword_top_listing')
            }}
          />
          <SwitchOption
            text={intl.get('customer.filters.main_page_ad')}
            checked={settings.main_page_ad}
            onChange={(value, event) => {
              event.preventDefault()
              event.stopPropagation()
              handleChangeShoppinglistsSetting(value, 'main_page_ad')
            }}
          />
        </ST.SwitchFieldWrapper>
      </div>
      <ST.ButtonWrapper>
        <Button type='danger' size='large' onClick={handleAddAd}>
          {intl.get('campaigns.shoppingListAds.buttonCreate')}
        </Button>
      </ST.ButtonWrapper>
      <TableHeaderOptions
        totalItems={totalCount}
        hasNotSort
        paginationSize={paginationSize}
        handleChangePaginationSize={handleChangePaginationSize}
      />
      {isLoading && !isEmpty ? (
        <Loader />
      ) : (
        <>
          {isEmpty ? (
            <>No Data</>
          ) : (
            <>
              <Table data={ads} loading={isLoading} columns={columns} rowKey='_id' onRowClick={handleClickRow} />
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
      )}
    </ST.Wrapper>
  )
}

export default ShoppingListAdsTab
