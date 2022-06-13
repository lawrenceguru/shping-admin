import React, { useEffect } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import RemoveIcon from '../RemoveIcon'
import * as ST from './styles'
import useGetSpendStreams from './useGetSpendStreams'

const { Column, ColumnGroup } = Table

const SpendTable = ({
  dataIndex,
  setTableHeight,
  setItem,
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  selectGtin,
  ...props
}) => {
  const { streams } = useGetSpendStreams({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry,
    gtins: selectGtin
  })

  useEffect(() => {
    setTableHeight(streams)
  }, [streams])

  return (
    <ST.TableWrapper {...props}>
      <div style={{ height: '100%' }} className='pdf-export' data-index={dataIndex}>
        <Table
          title={() => (
            <ST.HeaderBlock>
              <ST.Header>{intl.get('spend.streamTable.title')}</ST.Header>
              <RemoveIcon setItem={setItem} />
            </ST.HeaderBlock>
          )}
          pagination={false}
          bordered
          dataSource={streams}
          scroll={{ x: 1900 }}
        >
          <Column
            key='key'
            dataIndex='key'
            align='center'
            render={key => <span>{intl.get(`spend.streamTable.streams.${key}`)}</span>}
          />
          <ColumnGroup title={intl.get('spend.streamTable.clicks.title')} align='center'>
            <Column
              title={intl.get('spend.streamTable.clicks.socialLinksHeader')}
              dataIndex='social_link_clicks'
              key='social_link_clicks'
              align='center'
            />
            <Column
              title={intl.get('spend.streamTable.clicks.adClicksHeader')}
              dataIndex='cross_marketing_clicks'
              key='cross_marketing_clicks'
              align='center'
            />
            <Column
              title={intl.get('spend.streamTable.clicks.otherHeader')}
              dataIndex='link_clicks'
              key='link_clicks'
              align='center'
            />
            <Column
              title={intl.get('spend.streamTable.clicks.costHeader')}
              dataIndex='clicks_spend'
              key='clicks_spend'
              align='center'
              render={cost => <span>${cost.toFixed(2)}</span>}
            />
          </ColumnGroup>
          <ColumnGroup title={intl.get('spend.streamTable.video.title')}>
            <Column
              title={intl.get('spend.streamTable.video.videoHeader')}
              dataIndex='video_views'
              key='video_views'
              align='center'
            />
            <Column
              title={intl.get('spend.streamTable.video.costHeader')}
              dataIndex='video_views_spend'
              key='video_views_spend'
              align='center'
              render={cost => <span>${cost.toFixed(2)}</span>}
            />
          </ColumnGroup>
          <ColumnGroup title={intl.get('spend.streamTable.reviews.title')}>
            <Column
              title={intl.get('spend.streamTable.reviews.reviewsHeader')}
              dataIndex='reviews'
              key='reviews'
              align='center'
            />
            <Column
              title={intl.get('spend.streamTable.reviews.costHeader')}
              dataIndex='reviews_spend'
              key='reviews_spend'
              align='center'
              render={cost => <span>${cost.toFixed(2)}</span>}
            />
          </ColumnGroup>
          <ColumnGroup title={intl.get('spend.streamTable.impressions.title')}>
            <Column
              title={intl.get('spend.streamTable.impressions.impressionsHeader')}
              dataIndex='impressions'
              key='impressions'
              align='center'
            />
            <Column
              title={intl.get('spend.streamTable.impressions.costHeader')}
              dataIndex='impressions_spend'
              key='impressions_spend'
              align='center'
              render={cost => <span>${cost.toFixed(2)}</span>}
            />
          </ColumnGroup>
          <ColumnGroup title={intl.get('spend.streamTable.total.title')}>
            <Column
              title={intl.get('spend.streamTable.total.totalHeader')}
              dataIndex='total_spend'
              key='total_spend'
              align='center'
              render={total => <span>${total.toFixed(2)}</span>}
            />
          </ColumnGroup>
        </Table>
      </div>
    </ST.TableWrapper>
  )
}

SpendTable.propTypes = {
  setItem: PropTypes.func.isRequired,
  setTableHeight: PropTypes.func.isRequired,
  dataIndex: PropTypes.string,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  selectGtin: PropTypes.arrayOf(PropTypes.string).isRequired
}

SpendTable.defaultProps = {
  dataIndex: null
}

export default SpendTable
