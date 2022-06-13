import React, { useEffect, useCallback, useMemo, useState } from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import * as ST from './styles'
import { columns } from './consts'
import TableHeaderOptions from '../../atoms/TableHeaderOptions'
import Loader from '../../templates/Loader'
import Table from '../../molecules/Table'
import Button from '../../atoms/Button'
import SwitchOption from '../../atoms/SwitchOption'
import CampaignsFeaturedChart from '../../organisms/CampaignsFeaturedChart'

const CampaignFeaturedProductsTab = ({
  history,
  campaignsFeaturedStatusToggle,
  campaignsFeaturedGetFeaturedList,
  isLoading,
  featuredList,
  isUpdating
}) => {
  const mergedColumns = useMemo(() => {
    return [
      {
        key: 'switch',
        align: 'center',
        render: data => (
          <ST.SwitchFieldWrapper>
            <SwitchOption
              checked={data.status === 'active'}
              onChange={(value, event) => {
                event.preventDefault()
                event.stopPropagation()
                campaignsFeaturedStatusToggle({
                  id: data.id,
                  status: value ? 'active' : 'inactive',
                  name: data.name
                })
              }}
            />
          </ST.SwitchFieldWrapper>
        )
      },
      ...columns
    ]
  }, [columns])

  const [localFeauterd, setLocalFeatured] = useState([])
  const [paginationSize, setPaginationSize] = useState(10)
  const totalCount = useMemo(() => (localFeauterd && localFeauterd.length) || 0, [localFeauterd])

  useEffect(() => {
    if (!isLoading) {
      campaignsFeaturedGetFeaturedList()
    }
  }, [])

  useEffect(() => {
    setLocalFeatured(featuredList)
  }, [featuredList])

  const handleAddFeatured = useCallback(() => {
    history.push('/admin/campaigns/featured/new-featured')
  }, [])

  const handleEditFeatured = useCallback(id => {
    history.push(`/admin/campaigns/featured/${id}`)
  }, [])

  const setDefaultSort = useCallback(() => {
    setLocalFeatured(featuredList)
  }, [featuredList])

  return (
    <ST.Wrapper>
      <CampaignsFeaturedChart featuredList={featuredList} />
      <ST.Header>{intl.get('campaigns.featured.title')}</ST.Header>
      <ST.ButtonWrapper>
        <Button type='danger' size='large' onClick={handleAddFeatured}>
          {intl.get('campaigns.featured.buttonCreate')}
        </Button>
      </ST.ButtonWrapper>
      <TableHeaderOptions
        totalItems={totalCount}
        paginationSize={paginationSize}
        itemsForSort={localFeauterd}
        setDefaultSort={setDefaultSort}
        setCurrItemsForSort={sortedFeatured => setLocalFeatured(sortedFeatured)}
        optionsForSort={columns}
        handleChangePaginationSize={size => setPaginationSize(size)}
      />
      <ST.TableWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <Table
            columns={mergedColumns}
            rowKey='id'
            loading={isUpdating}
            limit={paginationSize}
            totalCounts={totalCount}
            data={localFeauterd}
            onRowClick={record => handleEditFeatured(record.id)}
            pagination
            isNotRenderOnEmptyData
          />
        )}
      </ST.TableWrapper>
    </ST.Wrapper>
  )
}

CampaignFeaturedProductsTab.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  campaignsFeaturedStatusToggle: PropTypes.func.isRequired,
  campaignsFeaturedGetFeaturedList: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  featuredList: PropTypes.arrayOf(PropTypes.object),
  isUpdating: PropTypes.bool
}

CampaignFeaturedProductsTab.defaultProps = {
  isLoading: false,
  featuredList: null,
  isUpdating: false
}

export default CampaignFeaturedProductsTab
