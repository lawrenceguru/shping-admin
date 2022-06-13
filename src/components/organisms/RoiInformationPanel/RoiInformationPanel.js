import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import OverviewInformationBlock from '../../atoms/OverviewInformationBlock'
import useGetRoiInfo from './useGetRoiInfo'

const RoiInformationPanel = ({
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  selectGtin,
  id,
  setInvisibleItemsCallback,
  ...props
}) => {
  const { impressions, productHits, users, reviewRatingScore } = useGetRoiInfo({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry,
    gtins: selectGtin
  })

  const smallWidgetsData = useMemo(() => {
    return {
      2: {
        widgetName: 'UniqueUsers',
        title: `${intl.get(`roiPage.uniqueUsers`)}`,
        currScans: users,
        color: '#f7cb4e'
      },
      3: {
        widgetName: 'Impressions',
        title: `${intl.get('roiPage.impressions')}`,
        currScans: impressions,
        color: '#1875f0'
      },
      4: {
        widgetName: 'ProductsHits',
        title: `${intl.get(`roiPage.productsHits`)}`,
        currScans: productHits,
        color: '#50d166'
      },
      10: {
        widgetName: 'reviewRatingScore',
        title: `${intl.get(`roiPage.reviewRatingScore`)}`,
        currScans: reviewRatingScore,
        color: '#9b47f5'
      }
    }
  }, [impressions, productHits, users])

  return (
    <OverviewInformationBlock
      widgetName={smallWidgetsData[id].widgetName}
      symbol={smallWidgetsData[id].symbol}
      title={smallWidgetsData[id].title}
      currScans={smallWidgetsData[id].currScans}
      color={smallWidgetsData[id].color}
      setItem={() => setInvisibleItemsCallback({ pageName: 'roiPage', widgetName: smallWidgetsData[id].widgetName })}
      {...props}
    />
  )
}

RoiInformationPanel.propTypes = {
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectCountry: PropTypes.string.isRequired,
  selectGtin: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  setInvisibleItemsCallback: PropTypes.func.isRequired
}

export default React.memo(RoiInformationPanel)
