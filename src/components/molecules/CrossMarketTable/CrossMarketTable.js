import React, { useEffect, useCallback, useState, useMemo } from 'react'
import intl from 'react-intl-universal'
import uuid from 'uuid4'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import TopTable from '../../atoms/TopTable'
import ProductImage from '../../atoms/ProductImage'
import { getNameFromTitle, proccessFiltersForGraphqlRequest, modifyDataForModal } from '../../../utils/analytics'
import * as ST from './styles'
import { adsModeOptions } from './consts'

const CrossMarketTable = ({
  filterAnalyticSetAdsMode,
  currentParticipant,
  setModal,
  setItem,
  filters,
  setTableHeight,
  ...props
}) => {
  const [currentData, setCurrentData] = useState([])
  const stopPropagation = event => {
    event.stopPropagation()
  }
  const adsMode = useMemo(() => {
    return filters ? filters.adsMode : null
  }, [filters])

  const queryFilters = useMemo(() => {
    return proccessFiltersForGraphqlRequest(filters)
  }, [filters])

  const queryRequest = useMemo(() => {
    return adsMode === 'product'
      ? `competitors_by_products {
      gtin
      product_name
      product_image
      impressions
      adv_clicks
      interactions
      users
      social_link_clicks
      link_clicks
      clicks
      reviews
      video_views
      activations
    }`
      : `competitors_by_campaigns {
      campaign_id
      campaign_name
      campaign_image
      impressions
      adv_clicks
      interactions
      users
      social_link_clicks
      link_clicks
      clicks
      reviews
      video_views
      activations
    }`
  }, [adsMode])

  const onClickHandler = (data, key, event) => {
    event.stopPropagation()
    event.preventDefault()
    if (data.interactions) {
      setModal({
        ...data,
        key
      })
    }
  }

  const productsColumns = useMemo(
    () => [
      {
        title: `${intl.get('spend.crossMarketing.image')}`,
        key: 'image',
        align: 'center',
        render: data => (
          <ST.ImageWrapper>
            <ProductImage image={adsMode === 'product' ? data.product_image : data.campaign_image} />
          </ST.ImageWrapper>
        )
      },
      {
        title: `${
          adsMode === 'product' ? intl.get('spend.crossMarketing.product') : intl.get('spend.crossMarketing.document')
        }`,
        dataIndex: adsMode === 'product' ? 'product_name' : 'campaign_name',
        key: 'name',
        align: 'center',
        render: (name, data) => <span>{name || getNameFromTitle(data.title) || '-'}</span>
      },
      {
        title: `${intl.get('spend.crossMarketing.impressions')}`,
        dataIndex: 'impressions',
        key: 'num_impressions',
        align: 'center',
        render: (i, data) => (
          <ST.StyledImpressionsWrapper>
            <ST.StyleImpressions onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
              <div>{data.impressions || 0}</div>
            </ST.StyleImpressions>
          </ST.StyledImpressionsWrapper>
        )
      },
      {
        title: `${intl.get('spend.crossMarketing.visits')}`,
        dataIndex: 'adv_clicks',
        key: 'num_visits',
        align: 'center',
        render: (i, data) => (
          <ST.StyledImpressionsWrapper>
            <ST.StyleImpressions onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
              <div>{data.adv_clicks || 0}</div>
            </ST.StyleImpressions>
          </ST.StyledImpressionsWrapper>
        )
      },
      {
        title: `${intl.get('spend.crossMarketing.users')}`,
        dataIndex: 'users',
        key: 'users',
        align: 'center',
        render: (i, data) => (
          <ST.StyledImpressionsWrapper>
            <ST.StyleImpressions onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
              <div>{data.users || 0}</div>
            </ST.StyleImpressions>
          </ST.StyledImpressionsWrapper>
        )
      },
      {
        title: `${intl.get('spend.crossMarketing.conversation')}`,
        key: 'conversation',
        align: 'center',
        render: data => (
          <ST.StyledImpressionsWrapper>
            <ST.StyleImpressions onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
              <div>{`${(
                (parseFloat((data.adv_clicks || 0) / (data.impressions || 0)) || 0).toFixed(2) * 100
              ).toFixed()}%`}</div>
            </ST.StyleImpressions>
          </ST.StyledImpressionsWrapper>
        )
      },
      {
        title: `${intl.get('spend.crossMarketing.interactions')}`,
        dataIndex: 'interactions',
        key: 'num_interactions',
        align: 'center',
        render: (i, data) => (
          <ST.StyledImpressionsWrapper>
            <ST.StyleImpressions
              isInteractions
              numInteractions={data.interactions}
              onMouseDown={stopPropagation}
              onTouchStart={stopPropagation}
              onClick={event =>
                onClickHandler(
                  modifyDataForModal(data, 'interactions_competitors'),
                  'interactions',
                  event,
                  data.interactions
                )
              }
            >
              {!!data.interactions && (
                <div>
                  <img src='/open-icon.svg' alt='open' />
                </div>
              )}
              <div>{data.interactions || 0}</div>
            </ST.StyleImpressions>
          </ST.StyledImpressionsWrapper>
        )
      }
    ],
    [intl, adsMode]
  )

  useEffect(() => {
    setTableHeight(currentData)
  }, [currentData])

  const handleRadio = useCallback(value => {
    filterAnalyticSetAdsMode(value)
  }, [])

  const getDataFromRequest = useCallback(
    data => {
      let result = null

      if (data && data.analytics) {
        result =
          adsMode === 'product' ? data.analytics.competitors_by_products : data.analytics.competitors_by_campaigns
      }

      return result
    },
    [adsMode]
  )

  return (
    <Query
      query={gql`
        query {
          analytics${queryFilters} {
            ${queryRequest}
          }
        }
      `}
      fetchPolicy='no-cache'
    >
      {({ data, loading }) => {
        return (
          <TopTable
            widgetName='crossMarketing'
            columns={productsColumns}
            columnsData={getDataFromRequest(data)}
            rowKey={() => uuid()}
            headerText={intl.get('spend.crossMarketing.title')}
            isFooter
            isLoading={loading}
            setItem={setItem}
            setCurrentData={setCurrentData}
            pagination
            radioValue={adsMode}
            handleRadio={handleRadio}
            radioOptions={adsModeOptions}
            viewAll
            scroll
            {...props}
          />
        )
      }}
    </Query>
  )
}

CrossMarketTable.propTypes = {
  setModal: PropTypes.func,
  setItem: PropTypes.func.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  filterAnalyticSetAdsMode: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  filters: PropTypes.object,
  currentParticipant: PropTypes.string
}

CrossMarketTable.defaultProps = {
  setModal: null,
  filters: null,
  currentParticipant: null
}

export default React.memo(CrossMarketTable)
