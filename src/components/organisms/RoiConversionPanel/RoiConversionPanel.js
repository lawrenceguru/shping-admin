import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import useGetRoiConversion from './useGetRoiConversion'
import PercentageBlock from '../../atoms/PercentageBlock'

const RoiConversionPanel = ({
  selectFirstDate,
  selectSecondDate,
  selectBrand,
  selectCountry,
  selectGtin,
  id,
  setInvisibleItemsCallback,
  ...props
}) => {
  const { totalConversionRate, buyingIntentConversionRate } = useGetRoiConversion({
    from: selectFirstDate,
    to: selectSecondDate,
    brand: selectBrand,
    country: selectCountry,
    gtins: selectGtin
  })

  const widgetsData = useMemo(() => {
    return {
      7: {
        widgetName: 'competitorAdConversion',
        title: `${intl.get(`roiPage.competitorAdConversion`)}`,
        value: totalConversionRate,
        description: `${intl.get(`roiPage.competitorAdConversionDescription`)}`
      },
      8: {
        widgetName: 'buyingIntentConversion',
        title: `${intl.get(`roiPage.buyingIntentConversion`)}`,
        value: buyingIntentConversionRate,
        description: `${intl.get(`roiPage.buyingIntentConversionDescription`)}`
      }
    }
  }, [buyingIntentConversionRate, totalConversionRate])

  return (
    <PercentageBlock
      widgetName={widgetsData[id].widgetName}
      title={widgetsData[id].title}
      value={widgetsData[id].value}
      description={widgetsData[id].description}
      setItem={() => setInvisibleItemsCallback({ pageName: 'roiPage', widgetName: widgetsData[id].widgetName })}
      {...props}
    />
  )
}

RoiConversionPanel.propTypes = {
  selectFirstDate: PropTypes.string.isRequired,
  selectSecondDate: PropTypes.string.isRequired,
  selectBrand: PropTypes.string.isRequired,
  selectGtin: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectCountry: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  setInvisibleItemsCallback: PropTypes.func.isRequired
}

export default React.memo(RoiConversionPanel)
