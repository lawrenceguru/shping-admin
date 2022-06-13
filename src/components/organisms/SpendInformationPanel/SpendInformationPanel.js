import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import OverviewInformationBlock from '../../atoms/OverviewInformationBlock'
import useGetSpendInformation from './useGetSpendInformation'

const SpendInformationPanel = ({
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  selectGtin,
  id,
  setInvisibleItemsCallback,
  ...props
}) => {
  const { impressions, interactions, reviews, videoViews } = useGetSpendInformation({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry,
    gtins: selectGtin
  })

  const smallWidgetsData = useMemo(() => {
    return {
      2: {
        widgetName: 'InteractionClicks',
        title: `${intl.get(`overviewPage.interaction_clicks`)}`,
        symbol: '$',
        currScans: interactions,
        color: '#50d166'
      },
      3: {
        widgetName: 'ApprovedReviews',
        title: `${intl.get('overviewPage.approved_reviews')}`,
        symbol: '$',
        currScans: reviews,
        color: '#DC143C'
      },
      4: {
        widgetName: 'CompletedVideoViews',
        title: `${intl.get(`overviewPage.completed_video_views`)}`,
        currScans: videoViews,
        symbol: '$',
        color: '#1875f0'
      },
      5: {
        widgetName: 'Impressions',
        title: `${intl.get(`overviewPage.impressions`)}`,
        currScans: impressions,
        symbol: '$',
        color: '#68228B'
      }
    }
  }, [impressions, interactions, reviews, videoViews])

  return (
    <OverviewInformationBlock
      widgetName={smallWidgetsData[id].widgetName}
      symbol={smallWidgetsData[id].symbol}
      title={smallWidgetsData[id].title}
      currScans={smallWidgetsData[id].currScans}
      color={smallWidgetsData[id].color}
      setItem={() => setInvisibleItemsCallback({ pageName: 'spendsPage', widgetName: smallWidgetsData[id].widgetName })}
      {...props}
    />
  )
}

SpendInformationPanel.propTypes = {
  id: PropTypes.string.isRequired,
  setInvisibleItemsCallback: PropTypes.func.isRequired,
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  selectGtin: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default React.memo(SpendInformationPanel)
